using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;
        
        public DashboardService(IDashboardRepository dashboardRepository )
        {
            this._dashboardRepository = dashboardRepository;
        }
        
        public Task<string> AmountAsync()
        {
            return _dashboardRepository.AmountAsync();
        }

        public Task<IEnumerable<Dashboard>> ListAsync()
        {
            return _dashboardRepository.ListAsync();
        }
    }
}