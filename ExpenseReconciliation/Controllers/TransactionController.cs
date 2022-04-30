using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseReconciliation.Controllers;

[Route("/api/[controller]")]
public class TransactionController : Controller
{
    private readonly ITransactionService _transactionService;
    
    public TransactionController(ITransactionService transactionService)
    {
        this._transactionService = transactionService;
    }
    [EnableCors]
    [HttpGet("GetAllAsync")]
    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _transactionService.ListAsync();

    }
    [EnableCors]
    [HttpGet("GetById")]
    public async Task<Transaction> GetById(int id)
    {
        return await _transactionService.GetByIdAsync(id);

    }
    [EnableCors]
    [HttpPost("Import")]
    public async Task GetAllAsync([FromBody] BankTransactionRequest bankTransactionRequest)
    {
        await _transactionService.ImportAsync(bankTransactionRequest);
    }
    [EnableCors]
    [HttpPost("UpdateSplit")]
    public async Task Split([FromBody] SplitRequest splitRequest)
    {
        await _transactionService.AddSplitAsync(splitRequest);
    }
    [EnableCors]
    [HttpGet("GetSplitById")]
    public async Task<IEnumerable<Split>> GetSplitById(int transactionId)
    {
        return await _transactionService.GetSplitByIdAsync(transactionId);

    }
    [EnableCors]
    [HttpPost("DeleteSplit")]
    public async Task Split([FromBody] int transactionId)
    {
        await _transactionService.DeleteSplitAsync(transactionId);
    }
}