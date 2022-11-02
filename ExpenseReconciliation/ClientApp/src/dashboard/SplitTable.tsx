import {useGetSplitSummaryQuery} from '../api/dashboardApi';
import User from '../model/user';
import {SplitSummaryTotal} from '../model/splitSummary';
import {renderCurrency} from '../services/formatting';

const SplitTable = ({users, monthsPrior}: { users: User[], monthsPrior: number }) => {
  const getFirstDayOfMonthsPrior = (date: Date, months: number): Date => {
    return new Date(date.getFullYear(), date.getMonth() - months, 1);
  }
  
  const getLastDayOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  
  const getFormattedDate = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  
  const { data: splitSummaryData, error: splitError, isLoading: splitLoading } = useGetSplitSummaryQuery({
    startDate: getFormattedDate(getFirstDayOfMonthsPrior(new Date(), monthsPrior)),
    endDate: getFormattedDate(getLastDayOfMonth(new Date())),
    timeUnit: 'Month',
  });

  if (splitLoading) {
    return (
      <div>Loading...</div>
    );
  }
  
  if (!splitSummaryData || splitError) {
    return (
      <div>Error loading data</div>
    );
  }
  
  const headers = () => {
    return (
      <>
        <tr className='text-center'>
          <th>Month</th>
          <th>Users</th>
          <th>Balance</th>
        </tr>
      </>
    );
  }
  
  // TODO: Better way of doing this
  let oddCount = 0;
  
  const renderTimeDescription = (total: SplitSummaryTotal) => {
    if (oddCount === 1) {
      oddCount = 0;
      return (<></>);
    }
    oddCount = 1;
    return (
      <td rowSpan={2}>{total.timeDescription}</td>
    )
  }
  
  const userTotals = (totals: SplitSummaryTotal[]) => {
    return totals.map((total) => {
      return (
        <tr key={total.timeDescription + total.userId}>
          {renderTimeDescription(total)}
          <td>{users.find(user => user.id === total.userId)?.userName}</td>
          <td>{renderCurrency(total.amount)}</td>
        </tr>)
    });
  }
  
  return (
    <div>
      <h1>Split Summary</h1>
      <table className="table table-compact w-full">
        <thead>
          {headers()}
        </thead>
        <tbody>
          {userTotals(splitSummaryData?.total)}
        </tbody>
      </table>
    </div>
  )
}

export default SplitTable;