import React, { useState } from 'react';
import Split from '../model/split';
import SplitImport from '../model/updateSplit';
import User from '../model/user';
import split from '../services/split';
import {useAppSelector} from '../hooks/hooks';
import {selectToken} from '../auth/authSlice';

const TransactionSplit = ({
  data,
  amount,
  transaction_id,
  users,
  changeSplitStatus,
}: {
  data: Split[];
  amount: number;
  transaction_id: number;
  users: User[];
  changeSplitStatus(status: boolean): void;
}) => {
  const token = useAppSelector(selectToken);

  amount = Math.round((amount / 100) * 100) / 100;
  const [splitted, setSplitted] = useState(data.length !== 0);

  const [percent, setPercent] = useState(0.7);
  const [splitAmounts, setSplitSplitAmounts] = useState({
    1: Math.round(amount * percent * 100) / 100,
    2: Math.round(amount * (1 - percent) * 100) / 100,
  });

  const splitOptions = [
    { value: 0, description: '0' },
    { value: 0.3, description: '30%' },
    { value: 0.4, description: '40%' },
    { value: 0.5, description: '50%' },
    { value: 0.6, description: '60%' },
    { value: 0.7, description: '70%' },
    { value: 1, description: '100%' },
    { value: -1, description: 'Custom' },
  ];

  const customAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSplitSplitAmounts({
      1: value,
      2: Math.round((amount - value) * 100) / 100,
    });
    setPercent(-1);
  };

  const splitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var percentage = Number(event.target.value);
    setPercent(percentage);
    setSplitSplitAmounts({
      1: Math.round(percentage * amount * 100) / 100,
      2: Math.round((amount - percentage * amount) * 100) / 100,
    });
  };

  ////parseSplit
  const parseSplit = async () => {
    const splits: Split[] = [];
    amount = amount * 100;
    let sum = 0;
    users.map(async (user) => {
      const roundedAmount = Math.round(splitAmounts[user.id] * 100);
      const split: Split = {
        userId: user.id,
        amount: roundedAmount,
        reviewed: false,
      };
      sum += roundedAmount;
      await splits.push(split);
    });

    if (sum !== amount) {
      const remainder = amount - sum;
      console.log(
        `Amount ${amount} - Sum ${sum} has a remainder of ${remainder}`,
      );
      if (Math.abs(remainder) < 5 && Math.abs(remainder) > 0.5) {
        console.log(`Adding remainder of ${remainder} to ${splits[0].userId}`);
        splits[0].amount += remainder;
      }
    }

    const body: SplitImport = {
      transactionId: transaction_id,
      splits: splits,
    };

    // TODO: Local service
    const response = await split(body, token);

    if (response.status === 201 || response.status === 200) {
      changeSplitStatus(true);
      setSplitted(true);
      console.log(splitted);
      // Updated, refresh the row
    } else if (response.status == 204) {
      // Amounts don't add up
    } else {
      // Error
    }
  };
  ////parseSplit

  const renderUser = () => {
    return users.map((user) => {
      return (
        <span key={`${transaction_id}-split-${user.id}-input`}>
          <label className="italic">{user.userName}</label>
          <input
            className="w-16 text-center"
            type="text"
            placeholder="Amount"
            onChange={(e) => {
              customAmount(e);
            }}
            value={splitAmounts[user.id]}
          />
        </span>
      );
    });
  };

  const renderAlreadySplit = (splits: Split[]) => {
    return splits.map((split: Split) => {
      return (
        <span
          key={`span-${transaction_id}-${split.id}`}
          className="text-center"
        >
          <span className="font-normal">
            {users?.find((user) => user.id == split.userId)?.userName}:{' '}
          </span>
          <em>{(split.amount / 100).toFixed(2)}</em>&nbsp;
        </span>
      );
    });
  };

  const renderOptions = splitOptions.map((option) => {
    return (
      <option
        key={`option-${transaction_id}-${option.value}`}
        value={option.value}
      >
        {option.description}
      </option>
    );
  });

  const deleteSplit = async () => {
    console.log('Delete');
    await fetch(`/api/transaction/DeleteSplit`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(transaction_id),
    });
    setSplitted(false);
    changeSplitStatus(false);
    console.log('Changed split status');
  };

  return splitted ? (
    <>
      <td className="p-2" colSpan={3}>
        Already split: {renderAlreadySplit(data)}
      </td>
      <td>
        <button className="p-1 w-16" onClick={deleteSplit}>
          Delete
        </button>
      </td>
    </>
  ) : (
    <>
      <td className="p-2" colSpan={3} key={`${transaction_id}-split-td`}>
        <div>
          <select className="mr-2" value={percent} onChange={splitAmountChange}>
            {renderOptions}
          </select>
          {renderUser()}
        </div>
      </td>
      <td className="p-2">
        {' '}
        <button className="p-1 w-16" onClick={parseSplit}>
          Split
        </button>
      </td>
    </>
  );
};

export default TransactionSplit;
