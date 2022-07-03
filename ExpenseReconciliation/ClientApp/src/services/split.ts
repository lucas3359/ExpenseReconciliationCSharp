import SplitImport from '../model/updateSplit';
import Transaction from '../model/transaction';
import { baseUrl, getCurrentToken } from './auth';

const splitAmountsAddUp = (split: SplitImport, amount: number): boolean => {
  let sum = 0;
  let absSum = 0;

  // TODO: Add this logic to C# backend
  // Check to make sure both the sum add up, and there isn't a discrepancy in
  // positive/negative
  split.splits.forEach((split) => {
    absSum += Math.abs(split.amount);
    sum += split.amount;
  });

  console.log(`Sum was: ${sum} and absolute sum was ${absSum} vs ${amount}`);
  return sum === amount && absSum === Math.abs(amount);
};

export default async (splitAmount: string) => {
  const body: SplitImport = JSON.parse(splitAmount);

  const response = await fetch(
    `${baseUrl}/api/transaction/GetById?id=${encodeURIComponent(
      body.transactionId,
    )}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${getCurrentToken()}`,
        'Content-Type': 'application/json',
      }),
    },
  );

  const transaction: Transaction = await response.json();

  console.log('Split Data:');
  console.log(body);

  if (!splitAmountsAddUp(body, transaction.amount)) {
    throw new Error('Amounts do not add up');
  } else {
    const split = await fetch(`${baseUrl}/api/transaction/UpdateSplit`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${getCurrentToken()}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    });

    return split;
  }
};
