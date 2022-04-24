using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
        
    public TransactionService(ITransactionRepository transactionRepository )
    {
        _transactionRepository = transactionRepository;
    }
        
    public Task<IEnumerable<Transaction>> ListAsync()
    {
        return _transactionRepository.ListAsync();
    }
    
}