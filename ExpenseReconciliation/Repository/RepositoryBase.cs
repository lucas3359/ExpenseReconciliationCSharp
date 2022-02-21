using System.Data;
using ExpenseReconciliation.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ExpenseReconciliation.Repository
{
    public class RepositoryBase
    {
        protected AppDbContext _context;

        protected RepositoryBase(AppDbContext dbContext)
        {
            _context = dbContext;
        }
    }
}