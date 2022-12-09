using System.Text.Json.Serialization;

namespace ExpenseReconciliation.Domain.Models;

public class Split
{
    public int Id { get; set; }
    public int TransactionId { get; set; }
    [JsonPropertyName("userId")]
    public int UserId { get; set; }
    [JsonPropertyName("amount")]
    public int Amount { get; set; }

    public bool? reviewed { get; set; }

    [Newtonsoft.Json.JsonIgnore]
    public virtual Transaction Transaction { get; set; }
}