using System.Globalization;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services;

public interface IImportRecordService
{
    Task<int> CreateNewImport(BankTransactionRequest bankTransactionRequest, int accountId);
}

public class ImportRecordService : IImportRecordService
{
    private readonly IImportRecordRepository _importRecordRepository;

    public ImportRecordService(IImportRecordRepository importRecordRepository)
    {
        _importRecordRepository = importRecordRepository;
    }

    public async Task<int> CreateNewImport(BankTransactionRequest bankTransactionRequest, int accountId)
    {
        var importRecord = new ImportRecord();
        importRecord.StartDate =
            DateTime.ParseExact(bankTransactionRequest.StartDate, "yyyyMMdd",
                CultureInfo.InvariantCulture); //.ToLocalTime();
        importRecord.EndDate =
            DateTime.ParseExact(bankTransactionRequest.EndDate, "yyyyMMdd", CultureInfo.InvariantCulture);
        importRecord.AccountId = accountId;
        var recordId = await _importRecordRepository.CreateNewImport(importRecord, accountId);
        return recordId.Id;
    }
}