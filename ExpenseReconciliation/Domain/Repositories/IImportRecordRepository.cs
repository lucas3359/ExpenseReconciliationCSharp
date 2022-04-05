using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface IImportRecordRepository
{
    Task<ImportRecord> CreateNewImport(ImportRecord importRecord, int accountId);
}