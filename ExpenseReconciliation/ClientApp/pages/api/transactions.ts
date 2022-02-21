import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    //const transactionService = new TransactionService()

    const transactions = {} // await transactionService.getTransactionList()

    res.status(200).json(transactions)
  } else {
    res.status(401)
  }
  res.end()
}
