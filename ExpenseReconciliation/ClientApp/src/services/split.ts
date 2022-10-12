import SplitImport from '../model/updateSplit';
import Transaction from '../model/transaction';

export const splitAmountsAddUp = (split: SplitImport, amount: number): boolean => {
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

const split = async (split: SplitImport, token: string | null) => {
  const response = await fetch(
    `/api/transaction/GetById?id=${encodeURIComponent(
      split.transactionId,
    )}`,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    },
  );

  const transaction: Transaction = await response.json();

  console.log('Split Data:');
  console.log(split);

  if (!splitAmountsAddUp(split, transaction.amount)) {
    throw new Error('Amounts do not add up');
  } else {
    return await fetch(`/api/transaction/UpdateSplit`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(split),
    });
  }
};

export default split;
