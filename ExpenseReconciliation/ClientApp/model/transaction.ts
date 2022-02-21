type Transaction = {
  id: number
  date: Date
  amount: number
  details: string
  accountId: number
  importId: number
  splits: []
}

export default Transaction
