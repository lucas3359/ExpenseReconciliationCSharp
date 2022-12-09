using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<Category> GetCategoryAsync(int id);
    Task<Category> AddCategoryAsync(Category category);
    Task DeleteCategoryAsync(Category category);
}

public class CategoryService : ICategoryService
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
    
    public async Task<Category> GetCategoryAsync(int id)
    {
        return await _categoryRepository.FindByIdAsync(id);
    }

    public async Task<Category> AddCategoryAsync(Category category)
    {
        return await _categoryRepository.AddAsync(category);
    }
    
    public async Task DeleteCategoryAsync(Category category)
    {
        await _categoryRepository.DeleteAsync(category);
    }
}