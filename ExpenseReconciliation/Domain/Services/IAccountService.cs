namespace ExpenseReconciliation.Domain.Services;

public interface IAccountService
{
    Task<int> FindOrCreateId(string accountNumber);
}
