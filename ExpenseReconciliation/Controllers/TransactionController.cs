using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Services;
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

    [HttpGet("GetAllAsync")]
    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _transactionService.ListAsync();

    }
    
    [HttpGet("GetById")]
    public async Task<Transaction> GetById(int id)
    {
        return await _transactionService.GetByIdAsync(id);

    }
    [HttpPost("Import")]
    public async Task GetAllAsync([FromBody] BankTransactionRequest bankTransactionRequest)
    {
        await _transactionService.ImportAsync(bankTransactionRequest);
    }
    
    [HttpPost("UpdateSplit")]
    public async Task Split([FromBody] SplitRequest splitRequest)
    {
        await _transactionService.AddSplitAsync(splitRequest);
    }
    
    [HttpGet("GetSplitById")]
    public async Task<IEnumerable<Split>> GetSplitById(int transactionId)
    {
        return await _transactionService.GetSplitByIdAsync(transactionId);

    }
    
    [HttpPost("DeleteSplit")]
    public async Task Split([FromBody] int transactionId)
    {
        await _transactionService.DeleteSplitAsync(transactionId);
    }
}