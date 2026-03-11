export type TransactionType = 'expense' | 'income';
export type PaidBy = 'John' | 'Christina';

export interface Category {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  note: string;
  paidBy: PaidBy;
  date: Date;
}
