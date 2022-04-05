using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;

namespace ExpenseReconciliation.Repository;

public class ImportRecordRepository :   RepositoryBase, IImportRecordRepository
{
    private readonly ImportRecord _importRecord;
    
    public ImportRecordRepository(AppDbContext appDbContext): base(appDbContext) 
    {
    }

    public async Task<ImportRecord> CreateNewImport(ImportRecord importRecord, int accountId)
    {
        var record = await _context.ImportRecords.AddAsync(importRecord);
        await _context.SaveChangesAsync();
        return record.Entity;
    }
    
}