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
  
  const wrapCurrency = (value: number): ReactNode => {
    const style = value < 0 ? {color: '#f26868'} : value > 0 ? {color: '#4cd07d'} : {};
    return (
      <span style={style}>{renderCurrency(value)}</span>
    );
  }
  
  const getUserData = (timePeriod: TimePeriod) => {
    const userData = {};
    timePeriod.totals.map((total: Total) => {
        userData[`user${total.userId}credit`] = wrapCurrency(total.credit);
        userData[`user${total.userId}debit`] = wrapCurrency(total.debit);
        userData[`user${total.userId}total`] = wrapCurrency(total.credit + total.debit);
    });
    return userData;
  }
  
  const getData = () => {
    if (!splitSummaryData) return [];
    const data = splitSummaryData.timePeriods.map((timePeriod) => {
      return {
        timeDescription: timePeriod.timeDescription,
        ...getUserData(timePeriod),
        balance: wrapCurrency(timePeriod.unassigned),
      }
    });
    return data;
  }
  
  const columns = [
    {field: 'timeDescription', header: 'Month'},
    {field: 'user1credit', header: 'Credit'},
    {field: 'user1debit', header: 'Debit'},
    {field: 'user1total', header: 'Total'},
    {field: 'user2credit', header: 'Credit'},
    {field: 'user2debit', header: 'Debit'},
    {field: 'user2total', header: 'Total'},
    {field: 'balance', header: 'Balance'},
  ]
  
  const dynamicColumns = columns.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });
  
  const userSubheaderGroup = (): ReactNode[] => {
    const subheaders: string[] = users.flatMap((user) => {
      return ['Credit', 'Debit', 'Total'];
    });
    
    return subheaders.map((subheader) => <Column header={subheader} key={`user-subheader-${subheader}`} />);
  }
  
  const userHeaderGroup = (): ReactNode[] => {
    return users.map((user, i) => {
      return (<Column header={user.userName} key={`user-group${user.id}`} colSpan={3} />);
    });
  };
  
  const headerGroup = <ColumnGroup>
    <Row>
      <Column header="Month" />
      {userHeaderGroup()}
      <Column header="Balance" />
    </Row>
    <Row>
      <Column />
      {userSubheaderGroup()}
      <Column />
    </Row>
  </ColumnGroup>;
  
  return (
    <DataTable value={getData()} headerColumnGroup={headerGroup}>
      {dynamicColumns}
    </DataTable>
  )
}

export default SplitTable;