using ExpenseReconciliation.Domain.Models;

namespace ExpenseReconciliation.Domain.Services;

public interface IImportTransactionService
{
    Task Import(BankTransactionRequest bandBody);
}