using System.Security.Cryptography.Xml;
using ExpenseReconciliation.Domain.Models;
using ExpenseReconciliation.Repository;

namespace ExpenseReconciliation.Services
{
    public class DashboardService
    {
        private readonly SplitRepository _splitRepository;
        private readonly TransactionRepository _transactionRepository;

        public DashboardService(SplitRepository splitRepository,
            TransactionRepository transactionRepository)
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
                {
                    user = g.Key,
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
            var summary = new SplitSummary
            {
                StartDate = startDate,
                EndDate = endDate,
                TimeUnit = timeUnit.ToString()
            };

            var transactions = await _transactionRepository.GetByDateAsync(startDate, endDate);
            var periodsList = GetTimeUnitStringList(startDate, endDate, timeUnit);

            var timePeriods = GetTimePeriods(periodsList, transactions, timeUnit);
            summary.TimePeriods = timePeriods;

            return summary;
        }

        private List<TimePeriod> GetTimePeriods(List<DateTime> periodsList,
            IEnumerable<Transaction> transactions,
            TimeUnit timeUnit)
        {
            var periods = new List<TimePeriod>();
            foreach (var timePeriod in periodsList)
            {
                var startDate = timePeriod;
                var endDate = GetEndDate(startDate, timeUnit);
                var transactionsInPeriod = transactions
                    .Where(x => x.Date >= startDate && x.Date < endDate).ToList();

                var period = new TimePeriod
                {
                    TimeDescription = string.Concat(timePeriod.ToString("MMMM") + ", " + timePeriod.Year),
                    Totals = GetTotals(transactionsInPeriod),
                };

                var transactionsSum = transactionsInPeriod.Sum(x => x.Amount);
                var totalDebit = period.Totals.Sum(x => x.Debit);
                var totalCredit = period.Totals.Sum(x => x.Credit);
                period.Unassigned = transactionsSum + totalCredit + totalDebit;

                periods.Add(period);
            }

            return periods;
        }

        private List<Total> GetTotals(List<Transaction> transactions)
        {
            var totalsDict = new Dictionary<int, List<decimal>>();

            foreach (var split in transactions
                         .SelectMany(transaction => transaction.splits))
            {
                if (!totalsDict.ContainsKey(split.UserId))
                {
                    totalsDict.Add(split.UserId, new List<decimal>());
                }

                totalsDict[split.UserId].Add(split.Amount);
            }

            return totalsDict.Keys.Select(userId =>
                new Total
                {
                    UserId = userId,
                    Debit = totalsDict[userId]
                        .Where(x => x < 0).Sum(),
                    Credit = totalsDict[userId].Where(x => x > 0).Sum()
                }).ToList();
        }

        private List<DateTime> GetTimeUnitStringList(DateTime startDate, DateTime endDate, TimeUnit timeUnit)
        {
            var timeUnitList = new List<DateTime>();
            if (timeUnit == TimeUnit.Month)
            {
                timeUnitList = Enumerable.Range(0, 13).Select(a => startDate.Date.AddMonths(a))
                    .TakeWhile(a =>
                        a <= endDate.AddDays(DateTime.DaysInMonth(endDate.Year, endDate.Month) - endDate.Day))
                    .Select(a => new DateTime(a.Year, a.Month, a.Day)).ToList();
            }
            else if (timeUnit == TimeUnit.Year)
            {
                timeUnitList = Enumerable.Range(0, 30).Select(a => startDate.Date.AddYears(a))
                    .TakeWhile(a => a <= endDate)
                    .Select(a => new DateTime(a.Year, 0, 0)).ToList();
            }

            return timeUnitList;
        }

        private DateTime GetEndDate(DateTime startDate, TimeUnit timeUnit)
        {
            var endDate = timeUnit switch
            {
                TimeUnit.Month => startDate.AddMonths(1),
                TimeUnit.Year => startDate.AddYears(1),
                _ => new DateTime()
            };

            return endDate;
        }
    }
}