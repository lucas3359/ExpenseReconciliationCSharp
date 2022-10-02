using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface ITransactionRepository
{
    Task<Paged<Transaction>> ListAsync(int page, int pageSize);
    Task AddAsync(List<Transaction> transactionList);
    Task<Transaction?> GetById(int id);
    Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize);
    Task UpdateCategoryAsync(CategoryRequest categoryRequest);
}