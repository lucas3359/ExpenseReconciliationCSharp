using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Domain.Repositories
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<Split>> ListAsync();
        Task<string> AmountAsync();
    }
}