using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAsync();
        Task<User?> FindByEmail(string email);
    }

    public class UserRepository : RepositoryBase, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<IEnumerable<User>> ListAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _context.Users.Where(user => user.Email == email).FirstAsync();
        }
    }
}