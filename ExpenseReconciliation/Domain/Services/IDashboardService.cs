using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Domain.Services
{
    public interface IDashboardService
    {
        Task<string> AmountAsync();
        Task<IEnumerable<Dashboard>> ListAsync();
        
    }
}