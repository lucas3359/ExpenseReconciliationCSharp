using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository;

public class TransactionSplit
{
    public Transaction transaction { get; set; }
    public Split split { get; set; }
}

public class TransactionRepository: RepositoryBase, ITransactionRepository
{
    public TransactionRepository(AppDbContext appDbContext): base(appDbContext) 
    {
        Console.WriteLine(appDbContext.Model.ToDebugString());
    }
    public async Task<IEnumerable<Transaction>> ListAsync()
    {
        var transactionSplit = new TransactionSplit();

        var transactions =  await _context.Transactions.Include(p=>p.splits).ToListAsync();
        
        return transactions;
    }
}