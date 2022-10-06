using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services
{
    public class DashboardService : IDashboardService
    {
        public class Dshhh
        {
        }

        private readonly ISplitRepository _splitRepository;
        
        public DashboardService(ISplitRepository splitRepository )
        {
            this._splitRepository = splitRepository;
        }
        
        public async Task<IEnumerable<Total>> AmountAsync()
        {
            var list = new List<Total>();
            var records = await _splitRepository.ListAsync();
            var amount = 0.0;

            var results = records.GroupBy(x => x.UserId)
                .Select(g => new { user = g.Key, amount = g.Sum(x => x.Amount) });
            
            foreach (var result in results)
            {
                var total = new Total();
                total.amount = result.amount;
                total.userId = result.user;
                list.Add(total);
            }

            return list;
        }

        public Task<IEnumerable<Split>> ListAsync()
        {
            return _splitRepository.ListAsync();
        }
    }
}