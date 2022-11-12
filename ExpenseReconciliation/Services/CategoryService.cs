using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;

namespace ExpenseReconciliation.Services;

public class CategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    
    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
    
    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.ListAllAsync();
    }

    public async Task AddCategoryAsync(Category category)
    {
        await _categoryRepository.AddAsync(category);
    }
    
    public async Task DeleteCategoryAsync(int id)
    {
        await _categoryRepository.DeleteAsync(id);
    }
}