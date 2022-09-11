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
    public async Task<Paged<Transaction>> ListAsync(int page, int pageSize)
    {
        var transactions =  await _context.Transactions
            .Include(p=>p.splits)
            .OrderByDescending(p => p.Date)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var itemCount = await _context.Transactions.CountAsync();
        
        return new Paged<Transaction>
        {
            Payload = transactions,
            Page = page,
            PageSize = pageSize,
            ResultsThisPage = transactions.Count,
            TotalNoOfItems = itemCount,
            TotalNoOfPages = itemCount / pageSize
        };
    }
    
    public async Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize)
    {
        var transactions =  await _context.Transactions
            .Include(p=>p.splits)
            .OrderByDescending(p => p.Date)
            .Where(txn=>txn.Date >= startDate && txn.Date <= endDate)
            .Skip(page * pageSize)
            .Take(pageSize)
            .ToListAsync();
        
        var itemCount = await _context.Transactions.CountAsync();
        
        return new Paged<Transaction>
        {
            Payload = transactions,
            Page = page,
            PageSize = pageSize,
            ResultsThisPage = transactions.Count,
            TotalNoOfItems = itemCount,
            TotalNoOfPages = itemCount / pageSize
        };
    }

    public async Task<IEnumerable<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.Transactions.Include(t=>t.splits).Where(t => t.Date >= startDate && t.Date <= endDate).ToListAsync();
    }

    public async Task AddAsync(List<Transaction> transactionList)
    {
        var uniqueRecord = transactionList.Where(newTrans => !_context.Transactions.Any(tranInDb => tranInDb.BankId == newTrans.BankId));
        _context.Transactions.AddRange(uniqueRecord);
        
        _logger.LogInformation("Adding {uniqueRecord.Count} unique transactions to database", uniqueRecord.Count());
        await _context.SaveChangesAsync();
    }

    public async Task<Transaction?> GetById(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }


}