using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services;

public interface IAuditService
{
    Task CreateAuditAsync(Audit audit);
}

public class AuditService : IAuditService
{
    private readonly IAuditRepository _auditRepository;
    
    public AuditService(IAuditRepository auditRepository)
    {
        _auditRepository = auditRepository;
    }
    
    public async Task CreateAuditAsync(Audit audit)
    {
        await _auditRepository.AddAsync(audit);
    }
}