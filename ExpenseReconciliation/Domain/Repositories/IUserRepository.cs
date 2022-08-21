using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAsync();
        Task<User?> FindByEmail(string email);
    }
}