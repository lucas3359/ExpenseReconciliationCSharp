using ExpenseReconciliation.Domain.Models;

namespace ApiTest.Mocks;

public class ImportTransactions
{
    public static BankTransactionRequest BankImportRequest()
    {
        return new BankTransactionRequest
        {
            AccountNumber = "06 0324 0532350 01",
            StartDate = "20220102",
            EndDate = "20220128",
            Transactions = new TransactionLine[]
            {
                new()
                {
                    Amount = "10.00",
                    Date = "20220104",
                    BankId = "202201041",
                    Memo = "Transfer Sushi",
                    Name = "06 1234 47658964 01",
                    TransactionType = "CREDIT"
                },
                new()
                {
                    Amount = "-37.73",
                    Date = "20220104",
                    BankId = "202201042",
                    Memo = "Debit Interest",
                    TransactionType = "INT"
                },
                new()
                {
                    Amount = "-4775.89",
                    Date = "20220106",
                    BankId = "202201061",
                    Name = "07 2474 0427424 11",
                    Memo = "Transfer Debit Transfer 1234",
                    TransactionType = "DEBIT"
                },
                new()
                {
                    Amount = "6.95",
                    Date = "20220121",
                    BankId = "202202211",
                    Name = "06 1234 5825481 11",
                    Memo = "Transfer Grocery",
                    TransactionType = "CREDIT"
                }
            }
        };
    }
}