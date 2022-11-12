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
                if (!await IsCategoryParent(id))
                {
                    throw new Exception("Can't delete category with children");
                }
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        private async Task<bool> IsCategoryParent(int id)
        {
            return await _context.Categories.Where(c => c.ParentId == id).AnyAsync();
        }
    }
}