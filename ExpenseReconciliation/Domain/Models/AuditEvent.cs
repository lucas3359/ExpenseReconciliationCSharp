namespace ExpenseReconciliation.Domain.Models;

public enum AuditEvent
{
    SPLIT_ADDED,
    SPLIT_DELETED,
    SPLIT_REVIEWED,
    IMPORT_CREATED,
    CATEGORY_ADDED,
    CATEGORY_DELETED,
}