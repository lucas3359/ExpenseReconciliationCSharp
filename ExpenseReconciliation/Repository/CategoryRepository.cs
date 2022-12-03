using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{
    public class CategoryRepository : RepositoryBase, ICategoryRepository
    {
        private readonly ILogger _logger;
        
        public CategoryRepository(AppDbContext appDbContext,
            ILogger<CategoryRepository> logger) : base(appDbContext)
        {
            _logger = logger;
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
                if (await IsCategoryParent(id))
                {
                    _logger.LogInformation("Couldn't delete category with id {Id} because it has child categories", id);
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