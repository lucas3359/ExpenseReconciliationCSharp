using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseReconciliation.Domain.Models;

public class Account
{
    [Column("id")]
    public int id { get; set; }
    [Column("account_number")]
    public string accountNumber { get; set; }
    [Column("name")]
    public string? name { get; set; }
}