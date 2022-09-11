namespace ExpenseReconciliation.Domain.Models;

public class Paged<T>
{
    public IEnumerable<T> Payload { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int ResultsThisPage { get; set; }
    public int TotalNoOfPages { get; set; }
    public int TotalNoOfItems { get; set; }
}