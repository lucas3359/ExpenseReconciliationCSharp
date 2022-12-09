using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Repository;

public interface IAuditRepository
{
    Task<Audit> AddAsync(Audit audit);
}

public class AuditRepository : RepositoryBase, IAuditRepository
{
    public AuditRepository(AppDbContext appDbContext) : base(appDbContext) { }
    
    public async Task<Audit> AddAsync(Audit audit)
    {
        await _context.Audits.AddAsync(audit);
        await _context.SaveChangesAsync();
        return audit;
    }
}