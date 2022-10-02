import useSWR from 'swr';
import React, {useContext, useEffect, useState} from 'react';
import TransactionRow from './TransactionRow';
import User from '../model/user';
import {AuthContext} from '../auth/AuthProvider';
import {fetcher} from '../services/auth';
import PagedTransaction from '../model/pagedTransaction';
import {Paginate} from '../components/Paginate';

export default function List() {
  const session = useContext(AuthContext);
  const token = session?.token;
  
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  
  const { data: userData, error: userError } = useSWR<User[], any>(['/api/user', token], fetcher);
  const {
    data: transactionData,
    error: transactionError,
    mutate,
  } = useSWR<PagedTransaction, any>([
    `/api/transaction/GetAllAsync?page=${currentPage}&pageSize=${pageSize}`,
    token], fetcher);

  useEffect(() => {
    
  }, [currentPage, pageSize]);

  if (!session.loggedIn) {
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
            <th className="py-3">Category</th>
            <th className="py-3 text-right">Amount</th>
            <th className="py-3"></th>
          </tr>
        </thead>
        {/* <tbody className='text-sm font-light'>{renderedList()}</tbody> */}
        <RenderedList currentItems={transactionData.payload} />
      </table>
      <Paginate currentPage={currentPage + 1}
                totalPages={transactionData.totalNoOfPages + 1}
                onPageChange={handlePageClick} />
    </>
  );
}
