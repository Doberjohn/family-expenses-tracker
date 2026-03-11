export type TransactionType = 'expense' | 'income';
export type PaidBy = 'John' | 'Christina';

export type CategoryType = 'expense' | 'income' | 'both';

export interface Category {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  type: CategoryType;
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
