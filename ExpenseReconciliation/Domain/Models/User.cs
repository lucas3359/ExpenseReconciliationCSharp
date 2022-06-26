using Microsoft.AspNetCore.Identity;

namespace ExpenseReconciliation.Domain.Models
{
    public class User: IdentityUser<int>
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
    }
}