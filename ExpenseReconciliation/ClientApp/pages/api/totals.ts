import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401)
  }

  //const splitService = new SplitService()
  //const totals = await splitService.getTotals()
  const totals = {} 

  return res.status(200).json(totals)
}
