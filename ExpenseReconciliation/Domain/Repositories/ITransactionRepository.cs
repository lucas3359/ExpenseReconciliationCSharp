using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface ITransactionRepository
{
    Task<IEnumerable<Transaction>> ListAsync();
    Task AddAsync(List<Transaction> transactionList);
}