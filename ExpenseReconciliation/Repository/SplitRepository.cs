using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{
    public class SplitRepository : RepositoryBase
    {
        public SplitRepository(AppDbContext appDbContext) : base(appDbContext)
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