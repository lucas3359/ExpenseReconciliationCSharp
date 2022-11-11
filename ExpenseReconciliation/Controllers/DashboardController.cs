using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers
{
    [Authorize("API")]
    [Route("/api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            this._dashboardService = dashboardService;
        }

        [HttpGet("GetAllAsync")]
        public async Task<IEnumerable<Split>> GetAllAsync()
        {
            return await _dashboardService.ListAsync();
        }

        [HttpGet("GetAmountAsync")]
        public async Task<TimePeriod> GetAmountAsync()
        {
            return await _dashboardService.AmountAsync();
        }

        [HttpGet("GetSplitSummary")]
        public async Task<SplitSummary> GetSplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            return await _dashboardService.SplitSummary(startDate, endDate, timeUnit);
        }
    }
}