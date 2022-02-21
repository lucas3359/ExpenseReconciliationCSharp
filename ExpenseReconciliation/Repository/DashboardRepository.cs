using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;

namespace ExpenseReconciliation.Repository
{
    public class Total
    {
        public int userId { get; set; }
        public double amount { get; set; }
    }
    public class DashboardRepository :   RepositoryBase, IDashboardRepository
    {
        public DashboardRepository(AppDbContext appDbContext): base(appDbContext) 
        {
        }
        public async Task<IEnumerable<Dashboard>> ListAsync()
        {
            return await _context.Dashboards.ToListAsync();
        }
        public async Task<string> AmountAsync()
        {
            var list = new List<Total>();
            var records = await ListAsync();
            var amount = 0.0;

            var results = records.GroupBy(x => x.user_id)
                .Select(g => new { user = g.Key, amount = g.Sum(x => x.amount) });
            
            foreach (var result in results)
            {
                var total = new Total();
                total.amount = result.amount;
                total.userId = result.user;
                list.Add(total);
            }
            var jsonString = JsonSerializer.Serialize(list);
            return jsonString;

        }
    }
}