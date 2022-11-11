using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Repository;

public class ImportRecordRepository : RepositoryBase
{
    private readonly ImportRecord _importRecord;

    public ImportRecordRepository(AppDbContext appDbContext) : base(appDbContext)
    {
    }

    public async Task<ImportRecord> CreateNewImport(ImportRecord importRecord, int accountId)
    {
        var record = await _context.ImportRecords.AddAsync(importRecord);
        await _context.SaveChangesAsync();
        return record.Entity;
    }
}