using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services;

public class AccountService : IAccountService
{
    private readonly IAccountRepository _accountRepository;
        
    public AccountService(IAccountRepository accountRepository )
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