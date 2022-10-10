import Category from "./category";

type Transaction = {
  id: number;
  date: Date;
  amount: number;
  details: string;
  accountId: number;
  importId: number;
  splits: [];
  category?: Category;
};

export default Transaction;
