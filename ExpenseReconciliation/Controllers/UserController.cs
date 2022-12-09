using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers
{
    [Authorize("API")]
    [Route("/api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService,
                              ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var user = await _userService.ListAsync();
            return user;
        }

        [HttpGet("/api/user/me")]
        public async Task<User?> GetCurrentUser()
        {
            _logger.LogInformation("Attempting to find current user");
            var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

            if (string.IsNullOrEmpty(email)) throw new HttpRequestException("Not found");

            return await _userService.GetUserByEmail(email);
        }
    }
}