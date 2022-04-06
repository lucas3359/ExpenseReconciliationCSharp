using System.Collections;
using System.Globalization;
using System.IO;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services 
{
    public class ImportTransactionService : IImportTransactionService
    {
        private string Ofx { get; set; } = "Good";
        private readonly IAccountService _accountService;
        private readonly IImportRecordService _importRecordService;
        private readonly ITransactionRepository _transactionRepository;
        public ImportTransactionService(IAccountService accountService, IImportRecordService importRecordService, ITransactionRepository transactionRepository)
        {
            _accountService = accountService;
            _importRecordService = importRecordService;
            _transactionRepository = transactionRepository;
        }

        public async Task Import(BankTransactionRequest bankTransactionRequest)
        {
           var accountId= await _accountService.FindOrCreateId(bankTransactionRequest.AccountNumber);
           var importId = await _importRecordService.CreateNewImport(bankTransactionRequest, accountId);

           var transactionList = new List<Transaction>();
           
           foreach (var line in bankTransactionRequest.Transactions)
           {
               var transaction = new Transaction();
               transaction.Amount =  double.Parse(line.Amount)*100;
               transaction.Date = DateTime.ParseExact(line.Date, "yyyyMMdd", CultureInfo.InvariantCulture);
               transaction.Details = string.Join(" ",line.Name.Trim(), line.Memo.Trim()) ;
               transaction.BankId = line.BankId; 
               transaction.AccountId = accountId;
               transaction.ImportId = importId;
               transactionList.Add(transaction);
           }

           await _transactionRepository.AddAsync(transactionList);
        }
    }

}