using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.ClientApp.src.model;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Domain.Services
{
    public interface IDashboardService
    {
        Task<string> AmountAsync();
        Task<IEnumerable<Split>> ListAsync();
        Task<SplitSummary> SplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit);
    }
}