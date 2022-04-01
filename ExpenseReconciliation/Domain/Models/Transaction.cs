namespace ExpenseReconciliation.Domain.Models;

public class Transaction
{
    public int id { get; set; }
    
    public string bank_id { get; set; }
    
    public DateTime date { get; set; }
    
    public int amount { get; set; }
    
    public string details { get; set; }
    
    public int account_id { get; set; }
    
    public int import_id { get; set; }

    public virtual ICollection<Split> splits { get; set; } 
}