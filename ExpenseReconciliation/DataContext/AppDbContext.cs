using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.DataContext 
{  
    public class AppDbContext : DbContext  
    {  
        public DbSet<User> Users { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            base.OnModelCreating(builder);
            
            builder.Entity<User>().ToTable("user");
            builder.Entity<User>().HasKey(p => p.id);
            //builder.Entity<Category>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
            //builder.Entity<Category>().Property(p => p.Name).IsRequired().HasMaxLength(30);
            //builder.Entity<Category>().HasMany(p => p.Products).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId);
            builder.Entity<Dashboard>().ToTable("split");
            builder.Entity<Dashboard>().HasKey(p => p.id);
        }
    }  
}