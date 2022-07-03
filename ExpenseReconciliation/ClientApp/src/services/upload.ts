import ofx from 'node-ofx-parser';
import TransactionImport from '../model/transactionImport';

function parseOfxBody(file: string): TransactionImport {
  let data = ofx.parse(file);

  const creditCardPrefix = data.OFX.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS;
  const bankPrefix = data.OFX.BANKMSGSRSV1?.STMTTRNRS?.STMTRS;

  const datatxn = creditCardPrefix
    ? creditCardPrefix.BANKTRANLIST.STMTTRN
    : bankPrefix.BANKTRANLIST.STMTTRN;
  const dataaccid = creditCardPrefix
    ? creditCardPrefix.CCACCTFROM.ACCTID
    : bankPrefix.BANKACCTFROM.ACCTID;
  const datadate = creditCardPrefix
    ? creditCardPrefix.BANKTRANLIST
    : bankPrefix.BANKTRANLIST;

  const body: TransactionImport = {
    startDate: datadate?.DTSTART,
    endDate: datadate?.DTEND,
    transactions: datatxn,
    accountNumber: dataaccid,
  };
  return body;
}

export default async (ofxBody) => {
  const body = parseOfxBody(ofxBody);
  console.log('Body:');
  console.log(body);
  const response = await fetch('http://localhost:5000/api/transaction/Import', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });

  return true;
};
