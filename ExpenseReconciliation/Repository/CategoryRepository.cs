using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{

    public class CategoryRepository :   RepositoryBase, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext): base(appDbContext) 
        {
        }
        public async Task<IEnumerable<Category>> ListAllAsync()
        {
            var t = await _context.Categories.ToListAsync();
            return await _context.Categories.ToListAsync();
        }
    }
}