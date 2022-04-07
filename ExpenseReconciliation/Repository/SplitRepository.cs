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
    public class SplitRepository :   RepositoryBase, ISplitRepository
    {
        public SplitRepository(AppDbContext appDbContext): base(appDbContext) 
        {
        }
        public async Task<IEnumerable<Split>> ListAsync()
        {
            return await _context.Splits.ToListAsync();
        }

        public async Task<Split> GetById(int transactionId)
        {
            return await _context.Splits.Where(split => split.TransactionId == transactionId).FirstOrDefaultAsync();
        }

        public async Task Add(Split split)
        {
            _context.Splits.AddRange(split);
            await _context.SaveChangesAsync();
        }

    }
}