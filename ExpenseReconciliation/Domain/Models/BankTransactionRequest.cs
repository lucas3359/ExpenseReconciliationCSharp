using System.Text.Json.Serialization;

namespace ExpenseReconciliation.Domain.Models;

public class BankTransactionRequest
{
    public string AccountNumber { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public IEnumerable<TransactionLine> Transactions { get; set; }
    
}

public class TransactionLine
{
    
    [JsonPropertyName("TRNTYPE")]
    public string TransactionType { get; set; }
    [JsonPropertyName("DTPOSTED")]

    public string Date { get; set; }
    [JsonPropertyName("TRNAMT")]
    public string Amount { get; set; }
    [JsonPropertyName("FITID")]
    public string BankId { get; set; }
    [JsonPropertyName("NAME")]
    public string Name { get; set; }
    [JsonPropertyName("MEMO")]
    public string Memo { get; set; }
    
}