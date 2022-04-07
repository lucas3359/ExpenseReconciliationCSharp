import { NextApiRequest, NextApiResponse } from 'next'
import SplitImport from '../../model/updateSplit'
import { getSession } from 'next-auth/client'
import Transaction from "../../model/transaction";
import {createWriteStream} from "fs";

const splitAmountsAddUp = (split: SplitImport, amount: number): boolean => {
  let sum = 0
  let absSum = 0

  // Check to make sure both the sum add up, and there isn't a discrepancy in
  // positive/negative
  split.splits.forEach((split) => {
    absSum += Math.abs(split.amount)
    sum += split.amount
  })

  console.log(`Sum was: ${sum} and absolute sum was ${absSum} vs ${amount}`)
  return sum === amount && absSum === Math.abs(amount)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    const body: SplitImport = JSON.parse(req.body)

    const response = await fetch("http://localhost:5000/api/transaction/GetById", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body.transactionId)
    });
    
    const transaction: Transaction = await response.json();
    
    console.log("Split Data:");
    console.log(body);
    
    //const transaction = await transactionService.getTransactionById(body.transactionId)
    if (!splitAmountsAddUp(body, transaction.amount)) {
      res.status(204).json({ error: 'Amounts do not add up' })
    } else {
      
      const split = await fetch("http://localhost:5000/api/transaction/UpdateSplit", {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body)
      });

      //const split = await splitService.updateSplit(body)

      //res.status(201).json(split)
    }
  } else {
    res.status(401)
  }
  res.end()
}
