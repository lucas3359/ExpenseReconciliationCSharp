import useSWR from 'swr';
import React, {useContext, useEffect, useState} from 'react';
import TransactionRow from './TransactionRow';
import Transaction from '../model/transaction';
import User from '../model/user';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import {addDays} from 'date-fns';
import ReactPaginate from 'react-paginate';
import {AuthContext} from '../auth/AuthProvider';
import {fetcher} from '../services/auth';

export default function List() {
  const session = useContext(AuthContext);
  const token = session?.token;
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  });

  const { data: userData, error: userError } = useSWR<User[], any>(['/api/user', token], fetcher);
  const {
    data: transactionData,
    error: transactionError,
    mutate,
  } = useSWR<Transaction[], any>([
    `/api/transaction/GetByDateAsync?startDate=${encodeURIComponent(dateRange.startDate.toISOString())}&endDate=${encodeURIComponent(dateRange.endDate.toISOString())}`,
    token], fetcher);

  const itemsPerPage = 4;
  const [currentItems, setCurrentItems] = useState<Transaction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (transactionData) {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(transactionData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(transactionData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, transactionData]);

  if (!session.loggedIn) {
    return <div>Not signed in</div>;
  }
  if (transactionError || userError) return <div>Failed to load</div>;
  if (!transactionData || !userData) return <div>loading...</div>;

  const handleSplitChange = (status: boolean) => {
    console.log(`handle split change: ${status}`);
    mutate();
  };
  console.log(dateRange.startDate.toISOString());

  const onChange = (item) => {
    setDateRange(item.selection);
    mutate();
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactionData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
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
      <div className="list heading">
        <DateRangePicker
          onChange={onChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={[dateRange]}
          direction="horizontal"
        />
      </div>
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
        <>
          <RenderedList currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
          />
        </>
      </table>
    </>
  );
}
