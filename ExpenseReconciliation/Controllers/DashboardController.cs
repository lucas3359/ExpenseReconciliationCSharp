using System.Collections.Generic;
using System.Threading.Tasks;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers
{
    [Route("/api/[controller]")]
    public class DashboardController: Controller
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            this._dashboardService = dashboardService;
        }

        [HttpGet("GetAllAsync")]
        public async Task<IEnumerable<Split>> GetAllAsync()
        {
            return await _dashboardService.ListAsync();

        }
        [HttpGet("GetAmountAsync")]
        public async Task<string> GetAmountAsync()
        {
            return await _dashboardService.AmountAsync();

        }

        
    }
}