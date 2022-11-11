import React from 'react';
import Total from '../model/total';
import {useAppSelector} from '../hooks/hooks';
import {selectLoggedIn} from '../auth/authSlice';
import {useGetAllUsersQuery} from '../api/usersApi';
import {useGetAmountsQuery} from '../api/dashboardApi';
import SplitTable from './SplitTable';
import {renderCurrency} from '../services/formatting';

export default function Dashboard() {
  const loggedIn = useAppSelector(selectLoggedIn);
  
  const { data: totalsData, error: totalsError, isLoading: totalsLoading } = useGetAmountsQuery();
  const { data: userData, error: userError, isLoading: userLoading } = useGetAllUsersQuery();
  
  if (!loggedIn) return <div>Unauthenticated</div>;
  
  if (totalsLoading || userLoading) return <div>loading...</div>;
  if (!totalsData || !userData || totalsError || userError) return <div>Failed to load</div>;

  const getUser = (userId: number): string | undefined => {
    return userData.find((user) => user.id === userId)?.userName;
  };

  const getTotals = (data: Total[]) => {
    return data.map((total) => {
      return (
        <div key={total.userId}>
          <span>
            <strong>{getUser(total.userId)} </strong>
          </span>
          <span>${renderCurrency(total.credit + total.debit)}</span>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols:3 px-5 md:gap-3 gap-y-7">
      <h1 className="text-4xl text-gray-700">Dashboard</h1>
      <br />
      <h2 className="text-xl text-gray-500">Amounts owing</h2>
      <br />
      <div>{getTotals(totalsData.totals)}</div>
      <br />
      <SplitTable users={userData} monthsPrior={12} />
    </div>
  );
}
