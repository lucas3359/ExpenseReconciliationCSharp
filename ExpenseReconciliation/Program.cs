using System.Configuration;
using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;
using ExpenseReconciliation.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(
            builder.Configuration.GetConnectionString("defaultConnection"))
        .UseSnakeCaseNamingConvention()
        .EnableSensitiveDataLogging() // TODO: Dev only
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Dev", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .Build();
    });
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        "default",
        "{controller}/{action=Index}/{id?}");
});

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (builder.Environment.IsDevelopment())
        // spa.UseReactDevelopmentServer("dev");
        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
});

app.Run();

// using System;
// using System.Collections.Generic;
// using System.Data.SqlClient;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
//
// namespace ExpenseReconciliation
// {
//     public class Program
//     {
//         public static void Main(string[] args)
//         {
//
//             CreateHostBuilder(args).Build().Run();
//             
//         }
//
//         public static IHostBuilder CreateHostBuilder(string[] args) =>
//             Host.CreateDefaultBuilder(args)
//                 .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
//     }
// }