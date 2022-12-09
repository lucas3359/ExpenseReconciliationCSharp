using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> ListAsync();
        Task<User?> GetUserByEmail(string email);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<IEnumerable<User>> ListAsync()
        {
            return await _userRepository.ListAsync();
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email)) return null;
            return await _userRepository.FindByEmail(email);
        }
    }
}