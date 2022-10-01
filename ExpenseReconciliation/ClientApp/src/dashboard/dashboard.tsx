import React from 'react';
import useSWR from 'swr';
import User from '../model/user';
import Total from '../model/total';
import { fetcher } from '../services/auth';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {selectLoggedIn} from '../auth/authSlice';
import {fetchTotals, selectDashboardStatus, selectTotals} from './dashboardSlice';
import {ApiStatus} from '../model/apiStatus';
import {fetchAllUsers, selectUsers} from '../auth/userSlice';

export default function Dashboard() {
  const loggedIn = useAppSelector(selectLoggedIn);
  const totals = useAppSelector(selectTotals);
  const dashboardStatus = useAppSelector(selectDashboardStatus);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  
  if (!loggedIn) return <div>Unauthenticated</div>;
  
  if (dashboardStatus === ApiStatus.Idle) {
    dispatch(fetchTotals());
  }
  
  if (users.status === ApiStatus.Idle) {
    dispatch(fetchAllUsers());
  }
  
  if (dashboardStatus === ApiStatus.Failed || users.status === ApiStatus.Failed) return <div>Failed to load</div>;
  if (dashboardStatus === ApiStatus.Loading || users.status === ApiStatus.Loading) return <div>loading...</div>;

  const getUser = (userId: number): string | undefined => {
    return users.users.find((user) => user.id === userId)?.userName;
  };

  const renderCurrency = (amount: number): string => {
    return (amount / 100).toFixed(2);
  };

  const getTotals = () => {
    return totals?.map((total) => {
      return (
        <div>
          <span>
            <strong>{getUser(total.userId)} </strong>
          </span>
          <span>${renderCurrency(total.amount)}</span>
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
      <div>{getTotals()}</div>
    </div>
  );
}
