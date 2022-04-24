using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.DataContext 
{  
    public class AppDbContext : DbContext  
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        
        public DbSet<Split> Splits { get; set; }
        
        public DbSet<Account> Accounts { get; set; }

        public DbSet<ImportRecord> ImportRecords { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            
            base.OnModelCreating(builder);
            
            builder.Entity<User>().ToTable("user");
            builder.Entity<User>().HasKey(p => p.id);

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

        }
    }  
}