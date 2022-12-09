using System.Globalization;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services;

public interface ITransactionService
{
    Task<Paged<Transaction>> ListAsync(int page, int pageSize);
    Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize);
    Task<Transaction?> GetByIdAsync(int id);
    Task<int> ImportAsync(BankTransactionRequest bankTransactionRequest);
    Task<List<Split>> AddSplitAsync(SplitRequest splitRequest);
    Task<IEnumerable<Split>> GetSplitByIdAsync(int transactionId);
    Task DeleteSplitAsync(int transactionId);
    Task UpdateCategoryAsync(CategoryRequest categoryRequest);
}

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IAccountService _accountService;
    private readonly IImportRecordService _importRecordService;
    private readonly ISplitRepository _splitRepository;
    private readonly ILogger<ITransactionService> _logger;

    public TransactionService(ITransactionRepository transactionRepository,
        IAccountService accountService,
        IImportRecordService importRecordService, 
        ILogger<ITransactionService> logger,
        ISplitRepository splitRepository)
    {
        _transactionRepository = transactionRepository;
        _accountService = accountService;
        _importRecordService = importRecordService;
        _splitRepository = splitRepository;
        _logger = logger;
    }

    public async Task<Paged<Transaction>> ListAsync(int page, int pageSize)
    {
        return await _transactionRepository.ListAsync(page, pageSize);
    }

    public async Task<Paged<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize)
    {
        return await _transactionRepository.GetByDateAsync(startDate, endDate, page, pageSize);
    }

    public async Task<Transaction?> GetByIdAsync(int id)
    {
        return await _transactionRepository.GetById(id);
    }

    public async Task<int> ImportAsync(BankTransactionRequest bankTransactionRequest)
    {
        var accountId = await _accountService.FindOrCreateId(bankTransactionRequest.AccountNumber);
        var importId = await _importRecordService.CreateNewImport(bankTransactionRequest, accountId);

        var transactionList = new List<Transaction>();

        foreach (var line in bankTransactionRequest.Transactions)
        {
            var transaction = new Transaction();
            transaction.Amount = decimal.Parse(line.Amount) * 100;
            transaction.Date = DateTime.ParseExact(line.Date, "yyyyMMdd", CultureInfo.InvariantCulture);
            transaction.Details = line.Name + " " + line.Memo;
            transaction.BankId = line.BankId;
            transaction.AccountId = accountId;
            transaction.ImportId = importId;
            transactionList.Add(transaction);
        }

        await _transactionRepository.AddAsync(transactionList);
        _logger.LogInformation("Parsed {transactionList.Count} transactions records from the file",
            transactionList.Count());

        return importId;
    }

    public async Task<List<Split>> AddSplitAsync(SplitRequest splitRequest)
    {
        var splitDb = (await _splitRepository.GetByIdAsync(splitRequest.TransactionId)).ToList();
        if (splitDb.Count > 0)
        {
            await _splitRepository.DeleteSplitAsync(splitRequest.TransactionId);
        }

        var splitList = new List<Split>();
        foreach (var record in splitRequest.Splits)
        {
            var split = new Split();
            split.Amount = record.Amount;
            split.TransactionId = splitRequest.TransactionId;
            split.UserId = record.UserId;
            splitList.Add(split);
        }
        
        await _splitRepository.AddSplitsAsync(splitList);

        return splitList;
    }

    public async Task<IEnumerable<Split>> GetSplitByIdAsync(int transactionId)
    {
        return await _splitRepository.GetByIdAsync(transactionId);
    }

    public async Task DeleteSplitAsync(int transactionId)
    {
        await _splitRepository.DeleteSplitAsync(transactionId);
    }
    
    public async Task UpdateCategoryAsync(CategoryRequest categoryRequest)
    {
        await _transactionRepository.UpdateCategoryAsync(categoryRequest);
    }
}