import Transaction from './transaction';

type PagedTransaction = {
  payload: Transaction[];
  page: number;
  pageSize: number;
  resultsThisPage: number;
  totalNoOfPages: number;
  totalNoOfItems: number;
};

export default PagedTransaction;
