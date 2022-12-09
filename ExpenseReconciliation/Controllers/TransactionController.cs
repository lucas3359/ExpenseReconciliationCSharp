using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExpenseReconciliation.Controllers
{
    [Authorize("API")]
    [Route("/api/[controller]")]
    public class TransactionController : Controller
    {
        private const int DefaultPageSize = 50;
        private readonly IAuditService _auditService;
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;

        public TransactionController(IAuditService auditService,
                                     ITransactionService transactionService,
                                     IUserService userService)
        {
            _auditService = auditService;
            _transactionService = transactionService;
            _userService = userService;
        }

        [HttpGet("GetAllAsync")]
        public async Task<Paged<Transaction>> GetAllAsync(int page = 0, int pageSize = DefaultPageSize)
        {
            return await _transactionService.ListAsync(page, pageSize);
        }

        [HttpGet("GetByDateAsync")]
        public async Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page = 0,
            int pageSize = DefaultPageSize)
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
        public async Task<ActionResult> Import([FromBody] BankTransactionRequest bankTransactionRequest)
        {
            var user = await GetCurrentUser();
            if (user == null) return Unauthorized("User not found");
            
            var result = await _transactionService.ImportAsync(bankTransactionRequest);
            
            await _auditService.CreateAuditAsync(new Audit
            {
                Event = AuditEvent.IMPORT_CREATED,
                EventId = result,
                User = user
            });

            return Ok();
        }

        [HttpPost("UpdateSplit")]
        public async Task<ActionResult> Split([FromBody] SplitRequest splitRequest)
        {
            var user = await GetCurrentUser();
            if (user == null) return Unauthorized("User not found");
            
            var transaction = await _transactionService.GetByIdAsync(splitRequest.TransactionId);
            if (transaction == null) return NotFound("Transaction with that ID couldn't be found");

            if (!transaction.Amount.Equals(splitRequest.Splits.Sum(s => s.Amount)))
            {
                return BadRequest("Split amounts don't equal the full transaction");
            }

            var splitResult = await _transactionService.AddSplitAsync(splitRequest);
            
            await _auditService.CreateAuditAsync(new Audit
            {
                Event = AuditEvent.SPLIT_ADDED,
                EventId = transaction.Id,
                User = user,
                EventData = GetSplitAuditData(splitResult)
            });
            
            return Ok();
        }

        [HttpGet("split/{transactionId:int}")]
        public async Task<IEnumerable<Split>> GetSplitById(int transactionId)
        {
            return await _transactionService.GetSplitByIdAsync(transactionId);
        }

        [HttpDelete("split/{transactionId:int}")]
        public async Task<ActionResult> DeleteSplit(int transactionId)
        {
            var user = await GetCurrentUser();
            if (user == null) return Unauthorized("User not found");
            
            var splits = await _transactionService.GetSplitByIdAsync(transactionId);  
            await _transactionService.DeleteSplitAsync(transactionId);
            
            await _auditService.CreateAuditAsync(new Audit
            {
                Event = AuditEvent.SPLIT_DELETED,
                EventId = transactionId,
                User = user,
                EventData = GetSplitAuditData(splits)
            });

            return Ok();
        }

        [HttpPost("UpdateCategory")]
        public async Task<ActionResult> UpdateCategory([FromBody] CategoryRequest categoryRequest)
        {
            var user = await GetCurrentUser();
            if (user == null) return Unauthorized("User not found");
            
            await _transactionService.UpdateCategoryAsync(categoryRequest);

            return Ok();
        }

        private async Task<User?> GetCurrentUser()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            var user = await _userService.GetUserByEmail(email);

            return user;
        }
        
        private static string GetSplitAuditData(IEnumerable<Split> splits)
        {
            return JsonConvert.SerializeObject(splits);
        }
    }
}