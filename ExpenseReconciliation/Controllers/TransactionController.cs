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

}