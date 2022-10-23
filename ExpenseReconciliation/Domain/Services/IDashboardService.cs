using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services
{
    public interface IDashboardService
    {
        Task<IEnumerable<Total>> AmountAsync();
        Task<IEnumerable<Split>> ListAsync();
        Task<SplitSummary> SplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit);
    }
}