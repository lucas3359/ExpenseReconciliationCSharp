import SplitImport from '../model/updateSplit';
import Transaction from '../model/transaction';

const splitAmountsAddUp = (split: SplitImport, amount: number): boolean => {
  let sum = 0;
  let absSum = 0;

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
    'http://localhost:5000/api/transaction/GetById?id=' +
      encodeURIComponent(body.transactionId),
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
  );

  const transaction: Transaction = await response.json();

  console.log('Split Data:');
  console.log(body);

  //const transaction = await transactionService.getTransactionById(body.transactionId)
  if (!splitAmountsAddUp(body, transaction.amount)) {
    throw new Error('Amounts do not add up');
  } else {
    const split = await fetch(
      'http://localhost:5000/api/transaction/UpdateSplit',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      },
    );

    //const split = await splitService.updateSplit(body)

    return split;
  }
};
