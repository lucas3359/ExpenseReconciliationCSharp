using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers
{
    [Authorize("API")]
    [Route("/api/[controller]")]
    public class TransactionController : Controller
    {
        private const int DefaultPageSize = 50;
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            this._transactionService = transactionService;
        }

        [HttpGet("GetAllAsync")]
        public async Task<Paged<Transaction>> GetAllAsync(int page = 0, int pageSize = 50)
        {
            return await _transactionService.ListAsync(page, pageSize);

        }

        [HttpGet("GetByDateAsync")]
        public async Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page = 0, int pageSize = 50)
        {
            return await _transactionService.GetByDateAsync(startDate, endDate, page, pageSize);

        }

        [HttpGet("GetById")]
        public async Task<ActionResult<Transaction?>> GetById(int id)
        {
            var transaction = await _transactionService.GetByIdAsync(id);
            if (transaction == null) return NotFound("Transaction with that ID couldn't be found");
            return Ok(transaction);
        }

        [HttpPost("Import")]
        public async Task Import([FromBody] BankTransactionRequest bankTransactionRequest)
        {
            await _transactionService.ImportAsync(bankTransactionRequest);
        }

        [HttpPost("UpdateSplit")]
        public async Task<ActionResult> Split([FromBody] SplitRequest splitRequest)
        {
            var transaction = await _transactionService.GetByIdAsync(splitRequest.TransactionId);

            if (transaction == null) return NotFound("Transaction with that ID couldn't be found");

            if (!transaction.Amount.Equals(splitRequest.Splits.Sum(s => s.Amount)))
            {
                return BadRequest("Split amounts don't equal the full transaction");
            }
            
            
            await _transactionService.AddSplitAsync(splitRequest);
            return Ok();
        }

        [HttpGet("split/{transactionId:int}")]
        public async Task<IEnumerable<Split>> GetSplitById(int transactionId)
        {
            return await _transactionService.GetSplitByIdAsync(transactionId);
        }

        [HttpDelete("split/{transactionId:int}")]
        public async Task DeleteSplit(int transactionId)
        {
            await _transactionService.DeleteSplitAsync(transactionId);
        }
        
        [HttpGet("GetAllCategories")]
        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _transactionService.GetAllCategoriesAsync();
        }
        
        [HttpPost("UpdateCategory")]
        public async Task UpdateCategory([FromBody] CategoryRequest categoryRequest)
        {
             await _transactionService.UpdateCategoryAsync(categoryRequest);
        }
    }
}