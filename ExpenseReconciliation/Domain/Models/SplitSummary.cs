namespace ExpenseReconciliation.ClientApp.src.model;

public class SplitSummary
{
    public string timeunit { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public List<Total> total { get; set; }
    public decimal unSplitted { get; set; }
}
public class Total
{
    public string timeUnit { get; set; }
    public int userId { get; set; }
    public decimal amount { get; set; }
}
public enum TimeUnit
{
    Month,
    Year
}

