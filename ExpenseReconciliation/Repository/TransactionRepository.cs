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
    private readonly ILogger _logger;
    public TransactionRepository(AppDbContext appDbContext, ILogger<TransactionRepository> logger): base(appDbContext) 
    {
        Console.WriteLine(appDbContext.Model.ToDebugString());
        _logger = logger;
    }
    public async Task<IEnumerable<Transaction>> ListAsync()
    {

        var transactions =  await _context.Transactions.Include(p=>p.splits).ToListAsync();
        
        return transactions;
    }

    public async Task Add(List<Transaction> transactionList)
    {
        var uniqueRecord = transactionList.Where(newTrans => !_context.Transactions.Any(tranInDb => tranInDb.BankId == newTrans.BankId));
        _context.Transactions.AddRange(uniqueRecord);
        
        _logger.LogInformation("Adding {uniqueRecord.Count} unique transactions to database", uniqueRecord.Count());
        await _context.SaveChangesAsync();
    }

    public async Task<Transaction> GetById(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }


}