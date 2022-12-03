import React, {useState} from 'react';
import Split from '../model/split';
import SplitImport from '../model/updateSplit';
import User from '../model/user';
import {useDeleteSplitMutation, useUpdateSplitMutation} from '../api/transactionApi';
import {useAppDispatch} from '../hooks/hooks';
import {successToast} from '../toast/toastSlice';
import Transaction from '../model/transaction';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';

interface SplitState {
  [key: number]: number,
}

const TransactionSplit = ({
  data,
  amount,
  transaction,
  users,
}: {
  data: Split[];
  amount: number;
  transaction: Transaction;
  users: User[];
}) => {
  const dispatch = useAppDispatch();
  amount = Math.round((amount / 100) * 100) / 100;
  const [alreadySplit, setAlreadySplit] = useState(data.length !== 0);

  const [percent, setPercent] = useState(0.5);
  const [splitAmounts, setSplitAmounts] = useState<SplitState>({
    1: Math.round(amount * percent * 100) / 100,
    2: Math.round(amount * (1 - percent) * 100) / 100,
  });

  const [updateSplit] = useUpdateSplitMutation();
  const [deleteSplit] = useDeleteSplitMutation();

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

  const customAmount = (value: number | null) => {
    if (!value) return;
    setSplitAmounts({
      1: value,
      2: Math.round((amount - value) * 100) / 100,
    });
    setPercent(-1);
  };

  const splitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const percentage = Number(event.target.value);
    setPercent(percentage);
    setSplitAmounts({
      1: Math.round(percentage * amount * 100) / 100,
      2: Math.round((amount - percentage * amount) * 100) / 100,
    });
  };
  
  const quickAssign = async (userId: number) => {
    const amounts = {
      1: userId === 1 ? amount : 0,
      2: userId === 2 ? amount : 0,
    };
    setPercent(userId === 1 ? 1 : 0);
    
    parseSplit(amounts);
    
    const user = users.find((user) => user.id === userId);
    
    dispatch(successToast(`'${transaction.details}' - Assigned 100% to ${user?.userName}`));
  }
  
  const parseSplit = (splitState: SplitState) => {
    const splits: Split[] = [];
    amount = amount * 100;
    let sum = 0;
    users.map((user: User) => {
      const roundedAmount = Math.round(splitState[user.id] * 100);
      const split: Split = {
        userId: user.id,
        amount: roundedAmount,
        reviewed: false,
      };
      sum += roundedAmount;
      splits.push(split);
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

    const split: SplitImport = {
      transactionId: transaction.id,
      splits: splits,
    };
    
    updateSplit(split);
    setAlreadySplit(true);
    
    dispatch(successToast(`'${transaction.details}' - Assigned ${percent * 100}% to ${users[1]?.userName} and ${Math.round((1 - percent) * 100)}% to ${users[0]?.userName}`));
  }
  
  const onDeleteSplit = (transactionId: number) => {
    deleteSplit({ id: transactionId });
    setAlreadySplit(false);
  }

  const renderUser = () => {
    return users.map((user) => {
      return (
        <React.Fragment key={`${transaction.id}-split-${user.id}-input`}>
          <span className="p-inputgroup-addon">{user.userName}</span>
          <InputNumber
            type="text"
            placeholder="Amount"
            mode="currency"
            currency="NZD"
            currencyDisplay="symbol"
            onValueChange={(e) => {
              customAmount(e.value);
            }}
            value={splitAmounts[user.id]}
          />
        </React.Fragment>
      );
    });
  };
  
  const renderUserButtons = () => {
    return users.map((user) => {
      return (
        <Button className="p-button-sm p-button-help p-button-outlined" key={`quick-button-${user.id}`}
          onClick={() => quickAssign(user.id)}>
          {user.userName}
        </Button>
      );
    });
  }

  const renderAlreadySplit = (splits: Split[]) => {
    return splits.map((split: Split) => {
      return (
        <span
          key={`span-${transaction.id}-${split.id}`}
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
        key={`option-${transaction.id}-${option.value}`}
        value={option.value}
      >
        {option.description}
      </option>
    );
  });

  return alreadySplit ? (
    <>
      <td className="p-2" colSpan={4}>
        Already split: {renderAlreadySplit(data)}
      </td>
      <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
        <Button icon="pi pi-trash"
                className="p-button-sm p-button-danger p-button-rounded p-button-text"
                onClick={() => onDeleteSplit(transaction.id)}
        />
      </td>
    </>
  ) : (
    <>
      <td className="p-2" colSpan={2} key={`${transaction.id}-split-td`}>
        <div className="p-inputgroup">
          <select className="mr-2" value={percent} onChange={splitAmountChange}>
            {renderOptions}
          </select>
          {renderUser()}
        </div>
      </td>
      <td className="p-buttonset" colSpan={2}>
        {renderUserButtons()}
      </td>
      <td className="text-right pr-6">
        {' '}
        <Button className="p-button-sm p-button-help" onClick={() => parseSplit(splitAmounts)}>
          Split
        </Button>
      </td>
    </>
  );
};

export default TransactionSplit;
