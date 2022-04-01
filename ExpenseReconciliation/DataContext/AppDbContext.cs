using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.DataContext 
{  
    public class AppDbContext : DbContext  
    {  
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Split> Splits { get; set; }

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
            builder.Entity<Split>().ToTable("split");
            builder.Entity<Split>().HasKey(split => split.Id);
            //builder.Entity<Split>().Property<int>("transaction_id");
            builder.Entity<Split>().HasOne<Transaction>(split => split.Transaction)
                .WithMany(transaction => transaction.splits)
                .HasForeignKey(split => split.TransactionId);
               // .HasForeignKey("transaction_id");
            

            builder.Entity<Transaction>().ToTable("transaction");
            builder.Entity<Transaction>().HasKey(p=> p.id);
            /*builder.Entity<Transaction>().HasMany(transaction => transaction.splits)
                .WithOne();*/
        }
    }  
}