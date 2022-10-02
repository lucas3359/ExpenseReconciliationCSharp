namespace ExpenseReconciliation.Domain.Models;

public class CategoryRequest
{
    public int TransactionId { get; set; }
    public Category Category { get; set; }
}