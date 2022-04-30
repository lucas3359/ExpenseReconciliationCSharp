using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers
{

        [Route("/api/user")]
        public class UserController : Controller
        {
            private readonly IUserService _userService;

            public UserController(IUserService userService)
            {
                _userService = userService;
            }
            [EnableCors]
            [HttpGet]
            public async Task<IEnumerable<User>> GetAllAsync()
            {
                var user = await _userService.ListAsync();
                return user;
            }
        }
}