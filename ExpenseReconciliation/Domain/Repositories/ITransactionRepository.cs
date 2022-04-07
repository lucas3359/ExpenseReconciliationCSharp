using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Repositories;

public interface ITransactionRepository
{
    Task<IEnumerable<Transaction>> ListAsync();
    Task Add(List<Transaction> transactionList);
    Task<Transaction> GetById(int id);
}