import {useGetSplitSummaryQuery} from '../api/dashboardApi';
import User from '../model/user';
import {TimePeriod, Total} from '../model/splitSummary';
import {renderCurrency} from '../services/formatting';
import React, {ReactNode} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';

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
  
  const userHeaders = () => {
    return users.map((user) => {
      return (
        <th key={user.id} colSpan={3}>{user.userName}</th>
      );
    });
  }
  
  const headers = () => {
    return (
      <>
        <tr className='text-center'>
          <th>Month</th>
          {userHeaders()}
          <th>Balance</th>
        </tr>
        <tr>
          <th></th>
          <th>Credit</th>
          <th>Debit</th>
          <th>Total</th>
          <th>Credit</th>
          <th>Debit</th>
          <th>Total</th>
          <th></th>
        </tr>
      </>
    );
  }
  
  const getUserTotals = (totals: Total[], timeKey: string) => {
    return users.map((user) => {
      const total = totals.find((total) => total.userId === user.id);
      if (!total) {
        return <React.Fragment key={timeKey + user.id}>
          <td></td><td></td><td className='bg-slate-50'></td>
        </React.Fragment>
      }
      
      const sum = total.credit + total.debit;
      
      return (
        <React.Fragment key={timeKey + user.id}>
          <td>{renderCurrency(total.credit)}</td>
          <td>{renderCurrency(total.debit)}</td>
          <td className={`${sum < 0 ? 'text-error' : 'text-success'} bg-slate-50`}>
            {renderCurrency(sum)}
          </td>
        </React.Fragment>
      )
    });
  }
  
  const getTimePeriods = (timePeriods: TimePeriod[]) => {
    return timePeriods.map((total) => {
      return (
        <tr key={total.timeDescription}>
          <td>{total.timeDescription}</td>
          {getUserTotals(total.totals, total.timeDescription)}
          <td className={`${total.unassigned < 0 ? 'text-error' : 'text-success'}`}>{renderCurrency(total.unassigned)}</td>
        </tr>)
    });
  }
  
  const getData = () => {
    if (!splitSummaryData) return [];
    return splitSummaryData.timePeriods.map((timePeriod) => {
      return {
        timeDescription: timePeriod.timeDescription,
        user0credit: renderCurrency(timePeriod.totals[0]?.credit),
        user0debit: renderCurrency(timePeriod.totals[0]?.debit),
        user0total: renderCurrency(timePeriod.totals[0] ? timePeriod.totals[0].credit + timePeriod.totals[0].debit : 0),
        user1credit: renderCurrency(timePeriod.totals[1]?.credit),
        user1debit: renderCurrency(timePeriod.totals[1]?.debit),
        user1total: renderCurrency(timePeriod.totals[1] ? timePeriod.totals[1].credit + timePeriod.totals[1].debit : 0),
        balance: renderCurrency(timePeriod.unassigned),
      }
    });
  }
  
  const columns = [
    {field: 'timeDescription', header: 'Month'},
    {field: 'user0credit', header: 'Credit'},
    {field: 'user0debit', header: 'Debit'},
    {field: 'user0total', header: 'Total'},
    {field: 'user1credit', header: 'Credit'},
    {field: 'user1debit', header: 'Debit'},
    {field: 'user1total', header: 'Total'},
    {field: 'balance', header: 'Balance'},
  ]
  
  const dynamicColumns = columns.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });
  
  const headerGroup = <ColumnGroup>
    <Row>
      <Column header="Month" />
      <Column header="Lucas" colSpan={3} />
      <Column header="Thomas" colSpan={3} />
      <Column header="Balance" />
    </Row>
    <Row>
      <Column />
      <Column header="Credit" />
      <Column header="Debit" />
      <Column header="Total" />
      <Column header="Credit" />
      <Column header="Debit" />
      <Column header="Total" />
      <Column />
    </Row>
  </ColumnGroup>;
  
  return (
    <DataTable value={getData()} headerColumnGroup={headerGroup}>
      {dynamicColumns}
    </DataTable>
  )
  
  /*
      <div>
      <h1 className="text-4xl text-gray-700 my-4">Split Summary</h1>
      <table className="table w-full">
        <thead>
          {headers()}
        </thead>
        <tbody>
          {getTimePeriods(splitSummaryData?.timePeriods)}
        </tbody>
      </table>
    </div>
   */
}

export default SplitTable;