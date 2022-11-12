using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{
    public class CategoryRepository : RepositoryBase, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<IEnumerable<Category>> ListAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task AddAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }
    }
}