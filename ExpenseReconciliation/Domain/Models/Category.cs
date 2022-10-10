using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace ExpenseReconciliation.Domain.Models;

public class Category
{
    [Column("id")] 
    public int Id { get; set; }

    public string Name { get; set; }

    public int? ParentId { get; set; }

    public bool? SplitIncluded { get; set; }
    
    public decimal? DefaultSplit { get; set; }

    [JsonIgnore]
    public virtual ICollection<Transaction> Transactions { get; set; }
}