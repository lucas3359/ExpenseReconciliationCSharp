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

        public async Task<IEnumerable<Split>> GetByIdAsync(int transactionId)
        {
            return await _context.Splits.Where(split => split.TransactionId == transactionId).ToListAsync();
        }

        public async Task AddSplitAsync(Split split)
        {
            _context.Splits.AddRange(split);
            await _context.SaveChangesAsync();
        }
        
        public async Task DeleteSplitAsync(int transactionId)
        {
             _context.Splits.RemoveRange(_context.Splits.Where(split => split.TransactionId == transactionId).ToList());
             await _context.SaveChangesAsync();
        }

    }
}