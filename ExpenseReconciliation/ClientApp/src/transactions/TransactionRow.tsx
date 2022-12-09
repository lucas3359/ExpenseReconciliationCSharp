import React, {useState} from 'react';
import Transaction from '../model/transaction';
import User from '../model/user';
import Split from '../model/split';
import TransactionSplit from './TransactionSplit';
import Category from '../model/category';
import CategoryDropDown from './CategoryDropDown';
import {renderCurrency, renderDate} from '../services/formatting';
import {Button} from 'primereact/button';

const TransactionRow = ({
  row,
  users,
  categories,
}: {
  row: Transaction,
  users: User[],
  categories : Category[]|undefined,
}) => {
  const [showSplit, setShowSplit] = useState(false);
  
  const splits: Split[] = row.splits;

  const renderSplit = () => {
    if (!showSplit) return;

    return (
      <tr
        className="border-b border-gray-100 bg-white"
        key={`${row.id}-tr-split`}
      >
        <TransactionSplit
          key={`${row.id}-split`}
          data={splits}
          amount={Number(row.amount)}
          transaction={row}
          users={users}
        />
      </tr>
    );
  };

  const splitButton = () => {
    if (splits.length > 0) {
      return (
        <Button icon={`pi ${showSplit ? 'pi-chevron-up' : 'pi-check'}`}
          onClick={() => setShowSplit(!showSplit)}
          className="p-button-sm p-button-success"
        />
      );
    } else {
      return (
        <Button icon={`pi ${showSplit ? 'pi-chevron-up' : ''}`}
          onClick={() => setShowSplit(!showSplit)}
          className={`p-button-sm p-button-secondary`}
        >
          {showSplit ? '' : 'Split'}
        </Button>
      );
    }
  };

  const renderSplitDetails = (splits: Split[]) => {
    return splits
      .map(
        (split) =>
          `${
            users.find((user) => user.id === split.userId)?.userName
          }: ${renderCurrency(split.amount)}`,
      )
      .join(' ');
  };
  
  return (
    <>
      <tr
        className="border-b border-gray-100 bg-white hover:bg-gray-100"
        key={`row-${row.id}`}
      >
        <td className="p-2 text-gray-600">{renderDate(row.date)}</td>
        <td className="p-2">
          {row.details}
          <br />
          {renderSplitDetails(row.splits)}
        </td>
        <td>
          <CategoryDropDown
            key = {`${row.id}-category`}
            transactionId={row.id}
            categories={categories}
            selectedCategory={row.category?.id}
            />
          </td>
        <td
          className={`p-2 text-right font-semibold ${
            Number(row.amount) < 0 ? 'text-red-300' : 'text-green-400'
          }`}
        >
          {row.amount ? renderCurrency(row.amount) : ''}
        </td>
        <td className="p-2 text-center">{splitButton()}</td>
      </tr>
      {renderSplit()}
    </>
  );
};

export default TransactionRow;
