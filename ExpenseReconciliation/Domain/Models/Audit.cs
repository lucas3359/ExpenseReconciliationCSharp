using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseReconciliation.Domain.Models;

public class Audit
{
    public int Id { get; set; }
    public DateTime Timestamp { get; }
    public AuditEvent Event { get; set; }
    public User User { get; set; }
    public int EventId { get; set; }
    [Column(TypeName = "jsonb")]
    public string EventData { get; set; }
    
    public Audit()
    {
        Timestamp = DateTime.UtcNow;
    }
}