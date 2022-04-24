using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services;

public interface IImportRecordService
{
    Task<int> CreateNewImport(BankTransactionRequest bankTransactionRequest, int accountId);
}