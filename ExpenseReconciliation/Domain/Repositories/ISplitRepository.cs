using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Domain.Repositories
{
    public interface ISplitRepository
    {
        Task<IEnumerable<Split>> ListAsync();
        Task<Split> GetById(int transactionId);
        Task Add(Split split);
    }
}