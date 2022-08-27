using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseReconciliation.Domain.Models;

public class Transaction
{
    [Column("id")]
    public int Id { get; set; }
    [Column("date")]
    public DateTime Date { get; set; }
    [Column("amount")]
    public decimal Amount { get; set; }
    [Column("details")]
    public string Details { get; set; }
    [Column("account_id")]
    public int AccountId { get; set; }
    [Column("import_id")]
    public int ImportId { get; set; }
    [Column("bank_id")]
    public string BankId { get; set; }

    public virtual ICollection<Split> splits { get; set; } 
}