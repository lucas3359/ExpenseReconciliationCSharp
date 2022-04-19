import React, {useEffect, useState} from 'react'
import Split from '../model/split'
import SplitImport from '../model/updateSplit'
import User from '../model/user'

const TransactionSplit = ({
  data,
  amount,
  transaction_id,
  users,
  changeSplitStatus,
}: {
  data: any
  amount: number
  transaction_id: number
  users: User[]
  changeSplitStatus(status:boolean): void
}) => {
  const [splitted, setSplitted] = useState(data.length !== 0)
  const splitAmounts = (value: number, account_id: number): number[] => {
    const userCount = users.length
    const newAmounts = amounts ? amounts : []
    newAmounts[account_id] = value

    users.map((user) => {
      if (user.id !== account_id) {
        const unroundedAmount = (amount - value) / Math.min(userCount - 1, 1)
        newAmounts[user.id] = Math.round(unroundedAmount)
      }
    })

    return newAmounts
  }

  const [percent, setPercent] = useState(0.7)
  const [amounts, setAmounts] = useState(() => {
    return splitAmounts(percent * amount, users[0].id)
  })

  const splitOptions = [
    { value: 0, description: '0' },
    { value: 0.3, description: '30%' },
    { value: 0.5, description: '50%' },
    { value: 0.7, description: '70%' },
    { value: 1, description: '100%' },
    { value: -1, description: 'Custom' },
  ]

  const setAmountChange = (event: React.ChangeEvent<HTMLInputElement>, account_id: number) => {
    const value = Number(event.target.value)
    setAmount(value, account_id)
    setPercent(-1)
  }

  const setAmount = (value: number, account_id: number) => {
    const newAmounts = splitAmounts(value, account_id)

    setAmounts(newAmounts)
  }

  const splitAmount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var percentage = Number(event.target.value)
    setPercent(percentage)
    setAmount(percentage * amount, users[0].id)
  }
  
////parseSplit
  const parseSplit = async () => {
    const splits: Split[] = []

    let sum = 0
    users.map(async (user) => {
      const roundedAmount = Math.round(amounts[user.id])
      const split: Split = {
        userId: user.id,
        amount: roundedAmount,
        reviewed: false,
      }
      sum += roundedAmount
      await splits.push(split)
    })

    if (sum !== amount) {
      const remainder = amount - sum
      console.log(`Amount ${amount} - Sum ${sum} has a remainder of ${remainder}`)
      if (Math.abs(remainder) < 5 && Math.abs(remainder) > 0.5) {
        console.log(`Adding remainder of ${remainder} to ${splits[0].userId}`)
        splits[0].amount += remainder
      }
    }

    const body: SplitImport = {
      transactionId: transaction_id,
      splits: splits,
    }

    const response = await fetch('/api/split', {
      method: 'POST',
      body: JSON.stringify(body),
    })
 
    if (response.status == 201) {
      changeSplitStatus(true);
      setSplitted(true);
      console.log(splitted);
      // Updated, refresh the row
    } else if (response.status == 204) {
      // Amounts don't add up
    } else {
      // Error
    }
  }
////parseSplit
  
  const renderCurrency = (amount: number): string => {
    return (amount / 100).toFixed(2)
  }

  const renderUserDropdown = () => {
    return users.map((user) => {
      return (
        <span key={`${transaction_id}-split-${user.id}-input`}>
          <label className='italic'>{user.name}</label>
          <input
            className='w-16 text-center'
            type='text'
            placeholder='Amount'
            value={renderCurrency(amounts[user.id])}
            onChange={(e) => {
              setAmountChange(e, user.id)
            }}
          />
        </span>
      )
    })
  }

  const renderAlreadySplit = (splits: Split[]) => {
    return(
        splits.map((split: Split) => {
      return (
        <span key={`span-${transaction_id}-${split.id}`} className='text-center'>
          <span className='font-normal'>{users?.find((user) => user.id == split.userId)?.name}: </span>
          <em>{renderCurrency(split.amount)}</em>&nbsp;
        </span>
      )
    })
    )
  }

  const renderSplitOptions = splitOptions.map((option) => {
    return (
        <option key={`option-${transaction_id}-${option.value}`} value={option.value}>
          {option.description}
        </option>
    )
  })
  
  const deleteSplit = async ()=> {
    console.log('Delete');
    await fetch("http://localhost:5000/api/transaction/DeleteSplit", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(transaction_id)
    });
    setSplitted(false);
    changeSplitStatus(false);
    console.log('Changed split status');
  }

  // useEffect(()=>{
  //   const splitData = async()=>{
  //     await fetch('http://localhost:5000/api/transaction/GetSplitById?transactionId='+ encodeURIComponent(transaction_id), {
  //       method: 'GET',
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //       })
  //     })
  //   }
  //   data = splitData();
  //   console.log(data);
  // },[splitted])
  
  // const splttedUi = ()=>{
  //   return(
  //       <>
  //         <td className='p-2' colSpan={3}>
  //           Already split: {renderAlreadySplit(data)}
  //         </td>
  //         <td>
  //           <button
  //               className='p-1 w-16' onClick={()=>deleteSplit}>
  //             Delete
  //           </button>
  //         </td>
  //       </>
  //   )
  // }
  //
  // const unsplittedUi = ()=>{
  //   return (
  //       <>
  //         <td className='p-2' colSpan={3} key={`${transaction_id}-split-td`}>
  //           <div>
  //             <select className='mr-2' value={percent} onChange={splitAmount}>
  //               {renderSplitOptions}
  //             </select>
  //             {renderUserDropdown()}
  //           </div>
  //         </td>
  //         <td className='p-2'>
  //           {' '}
  //           <button
  //               className='p-1 w-16'
  //               onClick={parseSplit}>
  //             Split
  //           </button>
  //         </td>
  //       </>
  //   )
  // }
  return (
      splitted
          ?<>
            <td className='p-2' colSpan={3}>
              Already split: {renderAlreadySplit(data)}
            </td>
            <td>
              <button
                  className='p-1 w-16' onClick={deleteSplit}>
                Delete
              </button>
            </td>
          </>
          :<>
            <td className='p-2' colSpan={3} key={`${transaction_id}-split-td`}>
              <div>
                <select className='mr-2' value={percent} onChange={splitAmount}>
                  {renderSplitOptions}
                </select>
                {renderUserDropdown()}
              </div>
            </td>
            <td className='p-2'>
              {' '}
              <button
                  className='p-1 w-16'
                  onClick={parseSplit}>
                Split
              </button>
            </td>
          </>
  )//splitted ? splttedUi() : unsplittedUi()
}

export default TransactionSplit
