using ApiTest.Mocks;
using ExpenseReconciliation.Controllers;
using ExpenseReconciliation.DataContext;
using ExpenseReconciliation.Domain.Services;
using ExpenseReconciliation.Repository;
using ExpenseReconciliation.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace ApiTest.Transactions;

public class ImportTests
{
    private TransactionController _transactionController;
    
    [SetUp]
    public void Setup()
    {
        var dbContextOptions = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "dev_expenses")
            .Options;
        var appDbContext = new AppDbContext(dbContextOptions);
        var accountServiceMock = new Mock<IAccountService>();
        accountServiceMock.Setup(
            s => s.FindOrCreateId(It.IsAny<string>())).ReturnsAsync(1);
        
        var transactionRepository = new TransactionRepository(appDbContext, Mock.Of<ILogger<TransactionRepository>>());
        var importRecordRepository = new ImportRecordRepository(appDbContext);
        var splitRepository = new SplitRepository(appDbContext);

        var importRecordService = new ImportRecordService(importRecordRepository);
        var transactionService = new TransactionService(transactionRepository, accountServiceMock.Object, importRecordService, 
            Mock.Of<ILogger<TransactionService>>(), splitRepository);
        _transactionController = new TransactionController(transactionService);
    }

    [Test]
    public async Task TestImportBankTransactions_ShouldImportAll()
    {
        await _transactionController.Import(ImportTransactions.BankImportRequest());

        var transactions = (await _transactionController.GetAllAsync()).ToList();
        Assert.That(transactions, Has.Count.EqualTo(4));

        var amount = transactions.Sum(transaction => transaction.Amount);
        Assert.That(amount, Is.EqualTo(-479667d).Within(0.0001));
    }
    
    [Test]
    public async Task TestImportDuplicateBankTransactions_ShouldRemainSame()
    {
        await _transactionController.Import(ImportTransactions.BankImportRequest());
        await _transactionController.Import(ImportTransactions.BankImportRequest());

        var transactions = (await _transactionController.GetAllAsync()).ToList();
        Assert.That(transactions, Has.Count.EqualTo(4));

        var amount = transactions.Sum(transaction => transaction.Amount);
        Assert.That(amount, Is.EqualTo(-479667d).Within(0.0001));
    }
}