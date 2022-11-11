using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services
{
    public class DashboardService
    {
        public class Dshhh
        {
        }

        private readonly SplitRepository _splitRepository;
        private readonly TransactionRepository _transactionRepository;

        public DashboardService(SplitRepository splitRepository,
            TransactionRepository transactionRepository )
        {
            this._splitRepository = splitRepository;
            _transactionRepository = transactionRepository;
        }
        
        public async Task<TimePeriod> AmountAsync()
        {
            var summary = new TimePeriod();
            summary.TimeDescription = "All time";
            var records = await _splitRepository.ListAsync();

            var results = records
                .GroupBy(x => x.UserId)
                .Select(g => new
                    { user = g.Key,
                      credit = g.Where(x => x.Amount > 0).Sum(x => x.Amount),
                      debit = g.Where(x => x.Amount < 0).Sum(x => x.Amount)
                    });

            foreach (var result in results)
            {
                var total = new Total();
                total.Credit = result.credit;
                total.Debit = result.debit;
                total.UserId = result.user;
                summary.Totals.Add(total);
            }

            return summary;
        }

        public Task<IEnumerable<Split>> ListAsync()
        {
            return _splitRepository.ListAsync();
        }

        public async Task<SplitSummary> SplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            return new SplitSummary();
        }

        /*public async Task<SplitSummary> SplitSummary(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            var splitSummary = new SplitSummary();
            var transactions = await _transactionRepository.GetByDateAsync(startDate,endDate) ;
            var totalPeriod = GetTimeUnitStringList(startDate, endDate, timeUnit);
            
            var userAmountList = new List<TimePeriod>();
            var unsplittedAmount=0m;
            
            // summing amount
            foreach (var tp in totalPeriod)
            {
                var userAmountDicPerPeriod = SumUsersAmount(transactions, tp);

                foreach (var record in userAmountDicPerPeriod)
                {
                    if (record.Key != -1)
                    {
                        var total = new TimePeriod();
                        total.UserId = record.Key;
                        total.Amount = record.Value;
                        total.TimeDescription = tp;
                        userAmountList.Add(total);
                    }
                    else
                    {
                        unsplittedAmount += record.Value;
                    }
                }
            }

            splitSummary.TimePeriods = userAmountList;
            splitSummary.StartDate = startDate;
            splitSummary.EndDate = endDate;
            splitSummary.Unassigned = unsplittedAmount;
            splitSummary.TimeUnit = timeUnit.ToString();

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
                timeUnitList = Enumerable.Range(0, 30).Select(a => startDate.Date.AddYears(a))
                    .TakeWhile(a => a <= endDate)
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
                if (timePeriodName == String.Concat(t.Date.ToString("MMMM") + ", " + t.Date.Year) || timePeriodName == t.Date.Year.ToString())
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
        }*/


}
}