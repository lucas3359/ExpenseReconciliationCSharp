using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services;

public class AccountService
{
    private readonly AccountRepository _accountRepository;
        
    public AccountService(AccountRepository accountRepository )
    {
        _accountRepository = accountRepository;
    }
        
    public async Task<int> FindOrCreateId(string accountNumber)
    {
        var tempAccount = new Account();
        tempAccount.accountNumber = accountNumber;
        var account = await _accountRepository.GetAsync(tempAccount);
        if (account.IsNotNull())
        {
            return account.id;
        }
        else
        {
             account = await _accountRepository.AddAsync(tempAccount);
             return account.id;
        }

    }
}