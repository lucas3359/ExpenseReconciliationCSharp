import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import ofx from 'node-ofx-parser'
import useSWR from "swr";
import Total from "../../model/total";
import TransactionImport from "../../model/transactionImport";
import SplitImport from "../../model/updateSplit";


function parseOfxBody(file: string): TransactionImport {
  let data = ofx.parse(file)

  const creditCardPrefix = data.OFX.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS
  const bankPrefix = data.OFX.BANKMSGSRSV1?.STMTTRNRS?.STMTRS

  const datatxn = creditCardPrefix ? creditCardPrefix.BANKTRANLIST.STMTTRN : bankPrefix.BANKTRANLIST.STMTTRN
  const dataaccid = creditCardPrefix ? creditCardPrefix.CCACCTFROM.ACCTID : bankPrefix.BANKACCTFROM.ACCTID
  const datadate = creditCardPrefix ? creditCardPrefix.BANKTRANLIST : bankPrefix.BANKTRANLIST

  const body: TransactionImport = {
    startDate: datadate?.DTSTART,
    endDate: datadate?.DTEND,
    transactions: datatxn,
    accountNumber: dataaccid,
  }
  return body
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  
  if (session) {
    if (req.method !== 'POST') {
      res.status(405).json({})
    }
    
    const body = parseOfxBody(req.body);
    console.log('Body:')
    console.log(body)
    const response = await fetch("https://localhost:5001/api/importTransaction/Import", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body)
    });
      
    // const body = importTransactionService.parseOfxBody(req.body)

    // await importTransactionService.importTransactions(body)

    res.status(201).json({ result: 'Imported' })
  } else {
    res.status(401)
  }

  res.end()
}
