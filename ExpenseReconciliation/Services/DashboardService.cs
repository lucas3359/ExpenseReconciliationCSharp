using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using ExpenseReconciliation.ClientApp.src.model;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Domain.Repositories;
using ExpenseReconciliation.Domain.Services;

namespace ExpenseReconciliation.Services
{
    public class DashboardService : IDashboardService
    {
        public class Dshhh
        {
        }

        private readonly ISplitRepository _splitRepository;
        private readonly ITransactionRepository _transactionRepository;

        public DashboardService(ISplitRepository splitRepository,ITransactionRepository transactionRepository )
        {
            this._splitRepository = splitRepository;
            _transactionRepository = transactionRepository;
        }
        
        public async Task<string> AmountAsync()
        {
            var list = new List<Total>();
            var records = await _splitRepository.ListAsync();
            var amount = 0.0;

            var results = records.GroupBy(x => x.UserId)
                .Select(g => new { user = g.Key, amount = g.Sum(x => x.Amount) });
            
            foreach (var result in results)
            {
                var total = new Total();
                total.amount = result.amount;
                total.userId = result.user;
                list.Add(total);
            }
            var jsonString = JsonSerializer.Serialize(list);
            return jsonString;
        }

        public Task<IEnumerable<Split>> ListAsync()
        {
            return _splitRepository.ListAsync();
        }

        public async Task<SplitSummary> SplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            var splitSummary = new SplitSummary();

            
            var transactions = await _transactionRepository.GetByDateAsync(startDate,endDate) ;
            var userAmountDic = new Dictionary<int, int>();

            var unsplittedAmount=0m;
            foreach (var t in transactions)
            {
                //splitted amount
                if (t.splits!=null)
                {
                    foreach (var split in t.splits)
                    {
                        if(!userAmountDic.ContainsKey(split.UserId))
                        {
                            userAmountDic.Add(split.UserId,split.Amount);
                        }
                        else
                        {
                            userAmountDic[split.UserId] += split.Amount;
                        }
                    }
                }
                else
                {
                    unsplittedAmount += t.Amount;
                }
            }
            var totalList = new List<Total>();

            foreach (var record in userAmountDic)
            {
                var total = new Total();
                total.userId = record.Key;
                total.amount = record.Value;
                totalList.Add(total);
            }

            splitSummary.total = totalList;
            splitSummary.startDate = startDate;
            splitSummary.endDate = endDate;
            splitSummary.unSplitted = unsplittedAmount;
            splitSummary.timeunit = timeUnit;
            
            return splitSummary;
        }
        
        
    }
}