namespace ExpenseReconciliation.Domain.Models;

public class SplitSummary
{
    public string TimeUnit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<Total> Total { get; set; }
    public decimal Unassigned { get; set; }
}
public class Total
{
    public string TimeDescription { get; set; }
    public int UserId { get; set; }
    public decimal Amount { get; set; }
}
public enum TimeUnit
{
    Month,
    Year
}

