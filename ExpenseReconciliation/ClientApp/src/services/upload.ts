import ofx from 'node-ofx-parser';
import TransactionImport from '../model/transactionImport';

export function parseOfxBody(file: string): TransactionImport {
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
