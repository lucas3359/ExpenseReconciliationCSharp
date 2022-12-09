using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository;

public interface IAccountRepository
{
    Task<Account> GetAsync(Account account);
    Task<Account> AddAsync(Account account);
}

public class AccountRepository : RepositoryBase, IAccountRepository
{
    public AccountRepository(AppDbContext appDbContext) : base(appDbContext)
    {
    }

    public async Task<Account> GetAsync(Account account)
    {
        return await _context.Accounts.Where(acc => acc.accountNumber == account.accountNumber).FirstOrDefaultAsync();
    }
    
    public async Task<Account> AddAsync(Account account)
    {
        var savedAccount = await _context.Accounts.AddAsync(account);
        return savedAccount.Entity;
    }
}