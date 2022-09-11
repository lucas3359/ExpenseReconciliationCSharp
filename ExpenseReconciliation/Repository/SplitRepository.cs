using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;
using System.Text.RegularExpressions;
using ExpenseReconciliation.ClientApp.src.model;

namespace ExpenseReconciliation.Repository
{
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


        // public async Task<SplitSummary> SummarizeSplit(DateTime startDate, DateTime endDate)
        // {
        //     var splitSummary = new SplitSummary();
        //     IQueryable<Split> splits= _context.Splits;
        //
        //     var records =
        //         _context.Transactions.Where(t => t.Date >= startDate && t.Date <= endDate);
        //         // splits.Join(_context.Transactions, s => s.TransactionId, t => t.Id, (s, t) => new
        //         // {
        //         //     transactionId = s.TransactionId,
        //         //     userId = s.UserId,
        //         //     amount = Aggregate ,
        //         //     date = t.Date
        //         // })
        //         // .Where(t => t.date >= startDate && t.date <= endDate)
        //         // .GroupBy()
        //         // .ToList();
        //         
        //         
        //         // from s in _context.Splits
        //         // join t in _context.Transactions on s.TransactionId equals t.Id
        //         // where t.Date >= startDate && t.Date <= endDate
        //         // group s by s.UserId, t.
        //         // select new
        //         // {
        //         //     userId = u.Key,
        //         //     amount = 
        //         //
        //         // };
        //     
        //     return splitSummary;
        // }

    }
}