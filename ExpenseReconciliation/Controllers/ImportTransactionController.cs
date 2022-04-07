// using ExpenseReconciliation.Domain.Models;
// using ExpenseReconciliation.Domain.Services;
// using ExpenseReconciliation.Services;
// using Microsoft.AspNetCore.Mvc;
//
// namespace ExpenseReconciliation.Controllers;
//
// [Route("/api/[controller]")]
// public class ImportTransactionController
// {
//     private readonly IImportTransactionService _importTransactionService;
//     public ImportTransactionController(IImportTransactionService importTransactionService)
//     {
//         this._importTransactionService = importTransactionService;
//     }
//     
//     [HttpPost("Import")]
//     public async Task GetAllAsync([FromBody] BankTransactionRequest bankTransactionRequest)
//     {
//         await _importTransactionService.Import(bankTransactionRequest);
//     }
// }