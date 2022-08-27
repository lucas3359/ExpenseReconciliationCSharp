using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface ITransactionRepository
{
    Task<IEnumerable<Transaction>> ListAsync(int page, int pageSize);
    Task AddAsync(List<Transaction> transactionList);
    Task<Transaction?> GetById(int id);
    Task<IEnumerable<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize);
}