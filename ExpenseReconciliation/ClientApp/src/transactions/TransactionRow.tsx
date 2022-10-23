import React, { useState } from 'react';
import Transaction from '../model/transaction';
import User from '../model/user';
import Icon from '../components/Icon';
import Split from '../model/split';
import TransactionSplit from './TransactionSplit';
import Category from '../model/category';
import CategoryDropDown from './CategoryDropDown';
import SplitImport from '../model/updateSplit';

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
  const [selectCategory, setCategory] = useState<string|undefined>(row.category?.name);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  
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
          transaction_id={row.id}
          users={users}
        />
      </tr>
    );
  };

  const splitButton = () => {
    const upIcon = <Icon icon="up" className="w-6 h-6" />;
    const tickIcon = <Icon icon="tick" className="w-6 h-6" />;

    if (splits.length > 0) {
      return (
        <button
          onClick={() => setShowSplit(!showSplit)}
          className="bg-green-300 w-16 hover:bg-green-100 focus:border-green-600 border-green-300 px-5"
        >
          {showSplit ? upIcon : tickIcon}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setShowSplit(!showSplit)}
          className={`w-16 ${showSplit ? 'px-5' : 'px-3'}`}
        >
          {showSplit ? upIcon : 'Split'}
        </button>
      );
    }
  };

  const renderDate = (inputDate: string | Date) => {
    const date = new Date(inputDate);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const renderCurrency = (amount: number): string => {
    return (amount / 100).toFixed(2);
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

  const renderCategory = (category: Category)=>{
    return category.name ?? "empty"
  };

  const categorySelection = (category: string):void =>{
    setCategory(category);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
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
        <td className="p-2">{row.details}<br />{renderSplitDetails(row.splits)}</td>
        {/*<td className="p-2">{row.category?.name ?? "/"}</td> label*/} 
        <td>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className={`btn btn-xs m-0 border-0 ${selectCategory ? 'bg-green-200 hover:bg-green-300' : 'bg-purple-200 hover:bg-purple-300'}`}>
              {selectCategory ? selectCategory : "Select..."}
            </label>
            <ul tabIndex={0} className={`dropdown-content menu p-2 shadow rounded-box w-52 ${selectCategory ? 'bg-green-200' : 'bg-purple-200'}`}>
              <CategoryDropDown
                key = {`${row.id}-category`}
                transactionId={row.id}
                categories={categories}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                categorySelection={categorySelection}
              />
            </ul>
          </div>
          </td>
        <td
          className={`p-2 text-right font-semibold ${
            Number(row.amount) < 0 ? 'text-gray-600' : 'text-green-400'
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
