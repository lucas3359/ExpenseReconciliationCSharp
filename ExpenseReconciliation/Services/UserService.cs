using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }
        
        public async Task<IEnumerable<User>> ListAsync()
        {
            return await _userRepository.ListAsync();
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _userRepository.FindByEmail(email);
        }
    }
}