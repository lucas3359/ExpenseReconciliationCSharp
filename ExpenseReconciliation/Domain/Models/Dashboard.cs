namespace ExpenseReconciliation.Domain.Models
{
    public class Dashboard
    {
        public int id { get; set; }
        public int transaction_id { get; set; }
        public int amount { get; set; }
        public int user_id { get; set; }
    }
}