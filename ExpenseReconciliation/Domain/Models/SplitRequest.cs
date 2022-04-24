using System.Text.Json.Serialization;

namespace ExpenseReconciliation.Domain.Models;

public class SplitRequest
{
    public IEnumerable<SplitLine> Splits { get; set; }
    public int TransactionId { get; set; }

}

public class SplitLine
{
    [JsonPropertyName("userId")]
    public int UserId { get; set; }
    [JsonPropertyName("amount")]
    public int Amount { get; set; }

    public bool? reviewed { get; set; }
    
}