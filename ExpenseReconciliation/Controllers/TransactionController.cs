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
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            this._transactionService = transactionService;
        }

        [HttpGet("GetAllAsync")]
        public async Task<IEnumerable<Transaction>> GetAllAsync()
        {
            return await _transactionService.ListAsync();

        }

        [HttpGet("GetByDateAsync")]
        public async Task<IEnumerable<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate)
        {
            return await _transactionService.GetByDateAsync(startDate, endDate);

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

        [HttpGet("GetSplitById")]
        public async Task<IEnumerable<Split>> GetSplitById(int transactionId)
        {
            return await _transactionService.GetSplitByIdAsync(transactionId);
        }

        [HttpPost("DeleteSplit")]
        public async Task DeleteSplit([FromBody] int transactionId)
        {
            await _transactionService.DeleteSplitAsync(transactionId);
        }
    }
}