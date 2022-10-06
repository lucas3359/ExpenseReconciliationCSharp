using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Domain.Services
{
    public interface IDashboardService
    {
        Task<IEnumerable<Total>> AmountAsync();
        Task<IEnumerable<Split>> ListAsync();
        
    }
}