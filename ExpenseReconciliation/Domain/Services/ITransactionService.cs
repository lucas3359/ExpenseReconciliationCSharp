using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services;

public interface ITransactionService
{
    Task<IEnumerable<Transaction>> ListAsync();
}