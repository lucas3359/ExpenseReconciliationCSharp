using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services;

public interface ITransactionService
{
    Task<IEnumerable<Transaction>> ListAsync(int page, int pageSize);
    Task<Transaction?> GetByIdAsync(int id);
    Task ImportAsync(BankTransactionRequest bankTransactionRequest);
    Task AddSplitAsync(SplitRequest splitRequest);
    Task DeleteSplitAsync(int transactionId);
    Task<IEnumerable<Split>> GetSplitByIdAsync(int transactionId);
    Task<IEnumerable<Transaction>> GetByDateAsync(DateTime startDate, DateTime endDate, int page, int pageSize);

}