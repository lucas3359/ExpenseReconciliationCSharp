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
            var totalPeriod = GetTimeUnitStringList(startDate, endDate, timeUnit);
            
            var userAmountList = new List<Total>();
            var unsplittedAmount=0m;
            // summing amount
            foreach (var tp in totalPeriod)
            {
                var userAmountDicPerPeriod = SumUsersAmount(transactions, tp);

                foreach (var record in userAmountDicPerPeriod)
                {
                    if (record.Key != -1)
                    {
                        var total = new Total();
                        total.userId = record.Key;
                        total.amount = record.Value;
                        total.timeUnit = DateTime.Parse(tp);
                        userAmountList.Add(total);
                    }
                    else
                    {
                        unsplittedAmount += record.Value;
                    }
                }
            }

            splitSummary.total = userAmountList;
            splitSummary.startDate = startDate;
            splitSummary.endDate = endDate;
            splitSummary.unSplitted = unsplittedAmount;
            splitSummary.timeunit = timeUnit;

            return splitSummary;
        }
        
        private List<string> GetTimeUnitStringList(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            var timeUnitList = new List<string>();
            if (timeUnit == TimeUnit.Month)
            {
                timeUnitList = Enumerable.Range(0, 13).Select(a => startDate.Date.AddMonths(a))
                    .TakeWhile(a => a <= endDate.AddDays(DateTime.DaysInMonth(endDate.Year,endDate.Month)-endDate.Day))
                    .Select(a => String.Concat(a.ToString("MMMM") + ", " + a.Year)).ToList();
            }
            else if (timeUnit == TimeUnit.Year)
            {
                timeUnitList = Enumerable.Range(2017, 2100).Select(a => startDate.AddYears(a))
                    .TakeWhile(a => a <= endDate.AddDays(DateTime.DaysInMonth(endDate.Year,endDate.Month)-endDate.Day))
                    .Select(a => String.Concat( a.Year)).ToList();
            }

            return timeUnitList;
        }

        private Dictionary<int, decimal> SumUsersAmount(IEnumerable<Transaction> transactions, string timePeriodName)
        {
            var userAmountDic = new Dictionary<int, decimal>();
            userAmountDic.Add(-1,0);
            //splitted amount
            foreach (var t in transactions)
            {
                var y = String.Concat(t.Date.ToString("MMMM") + ", " + t.Date.Year);
                var yy = t.Date.ToString("yy");
                if (timePeriodName == String.Concat(t.Date.ToString("MMMM") + ", " + t.Date.Year) || timePeriodName == t.Date.Year.ToString("yy"))
                {
                    if (t.splits.Count!=0)
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
                        userAmountDic[-1] += t.Amount;
                    }
                }
            }
            return userAmountDic;
        }


}
}