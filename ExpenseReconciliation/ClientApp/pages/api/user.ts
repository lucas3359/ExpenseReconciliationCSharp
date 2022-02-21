import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (session) {
    const users = { } //await userService.getUsers()

    res.status(200).json(users)
  } else {
    res.status(401)
  }
  res.end()
}
