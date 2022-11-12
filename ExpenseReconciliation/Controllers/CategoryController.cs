using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers;

[Authorize("API")]
[Route("/api/[controller]")]
public class CategoryController : Controller
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }
    
    [HttpGet("")]
    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _categoryService.GetAllCategoriesAsync();
    }
    
    [HttpPost("")]   
    public async Task AddCategory([FromBody] Category category)
    {
        await _categoryService.AddCategoryAsync(category);
    }
    
    [HttpDelete("{id:int}")]
    public async Task DeleteCategory(int id)
    {
        await _categoryService.DeleteCategoryAsync(id);
    }
}