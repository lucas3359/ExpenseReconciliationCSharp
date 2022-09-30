import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import TransactionRow from './TransactionRow';
import User from '../model/user';
import { fetcher } from '../services/auth';
import PagedTransaction from '../model/pagedTransaction';
import { Paginate } from '../components/Paginate';
import {useAppSelector} from '../hooks/hooks';
import {selectLoggedIn, selectToken, unauthenticated} from '../auth/authSlice';
import {useDispatch} from 'react-redux';

export default function List() {
  const loggedIn = useAppSelector(selectLoggedIn);
  const token = useAppSelector(selectToken);
  const dispatch = useDispatch();
  
  if (loggedIn === false) {
    dispatch(unauthenticated());
  }
  
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { data: userData, error: userError } = useSWR<User[], any>(
    ['/api/user', token],
    fetcher,
  );
  const {
    data: transactionData,
    error: transactionError,
    mutate,
  } = useSWR<PagedTransaction, any>(
    [
      `/api/transaction/GetAllAsync?page=${currentPage}&pageSize=${pageSize}`,
      token,
    ],
    fetcher,
  );

  useEffect(() => {}, [currentPage, pageSize]);

  if (!loggedIn) {
    return <div>Not signed in</div>;
  }
  if (transactionError || userError) return <div>Failed to load</div>;
  if (!transactionData || !userData) return <div>loading...</div>;

  const handleSplitChange = (status: boolean) => {
    console.log(`handle split change: ${status}`);
    mutate();
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page - 1);
  };

  function RenderedList({ currentItems }) {
    return currentItems.map((row) => {
      if (userData) {
        return (
          <TransactionRow
            key={row.id}
            row={row}
            users={userData}
            ChangeSplitStatus={(status) => handleSplitChange(status)}
          />
        );
      }
    });
  }

  return (
    <>
      <table id="table" className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3">Date</th>
            <th className="py-3">Description</th>
            <th className="py-3 text-right">Amount</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        {/* <tbody className='text-sm font-light'>{renderedList()}</tbody> */}
        <RenderedList currentItems={transactionData.payload} />
      </table>
      <Paginate
        currentPage={currentPage + 1}
        totalPages={transactionData.totalNoOfPages + 1}
        onPageChange={handlePageClick}
      />
    </>
  );
}
