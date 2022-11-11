namespace ExpenseReconciliation.Domain.Models;

public class SplitSummary
{
    public string TimeUnit { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<TimePeriod> TimePeriods { get; set; }
}

public class TimePeriod
{
    public string TimeDescription { get; set; }
    public List<Total> Totals { get; set; } = new();
    public decimal Unassigned { get; set; }
}

public class Total
{
    public int UserId { get; set; }
    public decimal Debit { get; set; }
    public decimal Credit { get; set; }
}

public enum TimeUnit
{
    Month,
    Year
}

