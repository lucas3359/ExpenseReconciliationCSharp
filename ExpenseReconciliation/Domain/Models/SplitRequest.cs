namespace ExpenseReconciliation.Domain.Models;

public class SplitRequest
{
    public IEnumerable<Split> Split { get; set; }
    
    public int TransactionId { get; set; }

}