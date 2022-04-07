using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services;

public interface ITransactionService
{
    Task<IEnumerable<Transaction>> ListAsync();
    Task<Transaction> GetById(int id);
    Task Import(BankTransactionRequest bankTransactionRequest);
    Task Split(SplitRequest splitRequest);

}