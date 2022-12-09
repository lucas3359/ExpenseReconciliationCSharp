using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExpenseReconciliation.Controllers;

[Authorize("API")]
[Route("/api/[controller]")]
public class CategoryController : Controller
{
    private readonly IAuditService _auditService;
    private readonly ICategoryService _categoryService;
    private readonly IUserService _userService;

    public CategoryController(IAuditService auditService,
                              ICategoryService categoryService,
                              IUserService userService)
    {
        _auditService = auditService;
        _categoryService = categoryService;
        _userService = userService;
    }
    
    [HttpGet("")]
    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _categoryService.GetAllCategoriesAsync();
    }
    
    [HttpPost("")]   
    public async Task<ActionResult> AddCategory([FromBody] Category category)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();
        
        var categoryResult = await _categoryService.AddCategoryAsync(category);
        
        await _auditService.CreateAuditAsync(new Audit
        {
            Event = AuditEvent.CATEGORY_ADDED,
            EventId = categoryResult.Id,
            User = user,
            EventData = GetCategoryAuditData(categoryResult)
        });

        return Ok();
    }
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCategory(int id)
    {
        var user = await GetCurrentUser();
        if (user == null) return Unauthorized();
        
        var category = await _categoryService.GetCategoryAsync(id);
        await _categoryService.DeleteCategoryAsync(category);
        
        await _auditService.CreateAuditAsync(new Audit
        {
            Event = AuditEvent.CATEGORY_DELETED,
            EventId = category.Id,
            User = user,
            EventData = GetCategoryAuditData(category)
        });
        
        return Ok();
    }
    
    private async Task<User?> GetCurrentUser()
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        var user = await _userService.GetUserByEmail(email);

        return user;
    }

    private static string GetCategoryAuditData(Category category)
    {
        return JsonConvert.SerializeObject(category);
    }
}