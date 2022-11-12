using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> ListAllAsync();
    Task AddAsync(Category category);
    Task DeleteAsync(int id);
}