using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExpenseReconciliation.Domain.Models;

public class Split
{
    public int Id { get; set; }
    
    //public int TransactionId { get; set; }
    public int TransactionId { get; set; }
    public int UserId { get; set; }
    
    public int Amount { get; set; }

    public bool? reviewed { get; set; }

    [JsonIgnore]
    public virtual Transaction Transaction { get; set; }
}