using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface IAccountRepository
{
    Task<Account> GetAsync(Account account);
    Task<Account> Add(Account account);
}