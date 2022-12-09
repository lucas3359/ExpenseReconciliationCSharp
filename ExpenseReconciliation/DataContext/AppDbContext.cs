using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.DataContext 
{  
    public class AppDbContext : DbContext  
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Split> Splits { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<ImportRecord> ImportRecords { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Audit> Audits { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            base.OnModelCreating(builder);
            
            builder.Entity<User>().ToTable("user");
            builder.Entity<User>().HasKey(p => p.Id);

            builder.Entity<Split>().ToTable("split");
            builder.Entity<Split>().HasKey(split => split.Id);

            builder.Entity<Split>().HasOne<Transaction>(split => split.Transaction)
                .WithMany(transaction => transaction.splits)
                .HasForeignKey(split => split.TransactionId);

            builder.Entity<Transaction>().ToTable("transaction");
            builder.Entity<Transaction>().HasKey(p=> p.Id);
            
            builder.Entity<Account>().ToTable("account");
            builder.Entity<Account>().HasKey(account => account.id);
            
            builder.Entity<ImportRecord>().ToTable("bank_import");

            builder.Entity<Role>().ToTable("role");
            builder.Entity<Role>().HasKey(role => role.Id);
            
            builder.Entity<Category>().ToTable("category");
            builder.Entity<Category>().HasKey(p => p.Id);

            builder.Entity<Transaction>().HasOne<Category>(transaction => transaction.Category)
                .WithMany(category => category.Transactions)
                .HasForeignKey(transaction => transaction.CategoryId);
            
            builder.Entity<Audit>().ToTable("audit");
            builder.Entity<Audit>().HasKey(p => p.Id);
        }
    }  
}