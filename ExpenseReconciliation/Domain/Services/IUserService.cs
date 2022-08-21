using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAsync();
        Task<User?> GetUserByEmail(string email);
    }
}