using System.Text.Json.Serialization;
using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace ExpenseReconciliation
{
    public class Startup
    {
        private readonly string _allowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddJsonOptions(x=>x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2", new OpenApiInfo { Title = "ExpenseReconciliation", Version = "v1" });
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = Configuration.GetConnectionString("defaultConnection");
            }

            var clientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
            if (string.IsNullOrEmpty(clientId))
            {
                clientId = Configuration["clientId"];
            }
            
            var clientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");
            if (string.IsNullOrEmpty(clientSecret))
            {
                clientSecret = Configuration["clientSecret"];
            }
            
            services.AddDbContext<AppDbContext>(
                options => options
                    .UseNpgsql(connectionString)
                    .UseSnakeCaseNamingConvention()
                    //.EnableSensitiveDataLogging() // TODO: Dev only
            );

            services.AddIdentity<User, Role>().AddEntityFrameworkStores<AppDbContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.UseGoogle(
                        clientId: clientId
                        );
                });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("API", new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .Build());
            });

            services.AddMemoryCache();
            
            services.AddCors(options =>
            {
                options.AddPolicy("Dev", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .Build();
                });
            });

            services.AddScoped<UserService>();
            services.AddScoped<DashboardService>();
            services.AddScoped<TransactionService>();
            services.AddScoped<CategoryService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<ImportRecordService>();

            services.AddScoped<UserRepository>();
            services.AddScoped<SplitRepository>();
            services.AddScoped<TransactionRepository>();
            services.AddScoped<AccountRepository>();
            services.AddScoped<ImportRecordRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v2/swagger.json", "v1");
            });
            
            if (env.IsDevelopment())
            {
                app.UseCors("Dev");
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseHttpLogging();
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(_allowSpecificOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer("start");
                }
            });
        }
    }
}