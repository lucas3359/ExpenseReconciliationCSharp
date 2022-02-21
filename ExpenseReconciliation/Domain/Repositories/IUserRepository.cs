using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> ListAsync();
    }
}