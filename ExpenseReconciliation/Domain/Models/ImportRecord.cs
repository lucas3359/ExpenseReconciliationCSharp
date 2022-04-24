namespace ExpenseReconciliation.Domain.Models;

public class ImportRecord
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
}