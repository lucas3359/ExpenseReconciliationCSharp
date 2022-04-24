using System.Globalization;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IAccountService _accountService;
    private readonly IImportRecordService _importRecordService;
    private readonly ISplitRepository _splitRepository;
    private readonly ILogger _logger;
        
    public TransactionService(ITransactionRepository transactionRepository,IAccountService accountService, 
        IImportRecordService importRecordService, ILogger<TransactionService> logger,
        ISplitRepository splitRepository )
    {
        _transactionRepository = transactionRepository;
        _accountService = accountService;
        _importRecordService = importRecordService;
        _splitRepository = splitRepository;
        _logger = logger;
    }
        
    public async Task<IEnumerable<Transaction>> ListAsync()
    {
        return await _transactionRepository.ListAsync();
    }

    public async Task<Transaction> GetByIdAsync(int id)
    {
        return await _transactionRepository.GetById(id);
    }

    public async Task ImportAsync(BankTransactionRequest bankTransactionRequest)
    {
        var accountId= await _accountService.FindOrCreateId(bankTransactionRequest.AccountNumber);
        var importId = await _importRecordService.CreateNewImport(bankTransactionRequest, accountId);

        var transactionList = new List<Transaction>();
           
        foreach (var line in bankTransactionRequest.Transactions)
        {
            var transaction = new Transaction();
            transaction.Amount =  double.Parse(line.Amount)*100;
            transaction.Date = DateTime.ParseExact(line.Date, "yyyyMMdd", CultureInfo.InvariantCulture);
            transaction.Details = line.Name +" " + line.Memo;
            transaction.BankId = line.BankId; 
            transaction.AccountId = accountId;
            transaction.ImportId = importId;
            transactionList.Add(transaction);
        }
        await _transactionRepository.AddAsync(transactionList);
        _logger.LogInformation("Parsed {transactionList.Count} transactions records from the file", transactionList.Count());
    }

    public async Task AddSplitAsync(SplitRequest splitRequest)
    {

        var splitDb = await _splitRepository.GetByIdAsync(splitRequest.TransactionId);
        if (splitDb.IsNull())
        {
            
        }
        else
        {
            foreach (var record in splitRequest.Splits)
            {
                var split = new Split();
                split.Amount = record.Amount;
                split.TransactionId = splitRequest.TransactionId;
                split.UserId = record.UserId;
                await _splitRepository.AddSplitAsync(split);
            }
        }
    }
    
    public async Task<IEnumerable<Split>> GetSplitByIdAsync(int transactionId)
    {
        return await _splitRepository.GetByIdAsync(transactionId);
    }

    public async Task DeleteSplitAsync(int transactionId)
    {
        await _splitRepository.DeleteSplitAsync(transactionId);
    }

}