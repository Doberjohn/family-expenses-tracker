import { Category, Transaction } from './types';
import { colors } from './theme';

export const categories: Category[] = [
  { name: 'Groceries', icon: 'ShoppingCart', color: colors.amber, bgColor: colors.amberBg },
  { name: 'Restaurant', icon: 'Utensils', color: colors.indigo, bgColor: colors.indigoBg },
  { name: 'Electric', icon: 'Zap', color: colors.green, bgColor: colors.greenBg },
  { name: 'Transport', icon: 'Car', color: colors.indigo, bgColor: colors.indigoBg },
  { name: 'Salary', icon: 'Briefcase', color: colors.green, bgColor: colors.greenBg },
  { name: 'Freelance', icon: 'Laptop', color: colors.indigo, bgColor: colors.indigoBg },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const mar8 = new Date(2026, 2, 8);
const mar7 = new Date(2026, 2, 7);
const mar1 = new Date(2026, 2, 1);

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 67.30,
    type: 'expense',
    category: categories[0],
    note: 'Weekly groceries',
    paidBy: 'John',
    date: today,
  },
  {
    id: '2',
    amount: 42.80,
    type: 'expense',
    category: categories[1],
    note: 'Dinner out',
    paidBy: 'Christina',
    date: yesterday,
  },
  {
    id: '3',
    amount: 124.00,
    type: 'expense',
    category: categories[2],
    note: 'Monthly bill',
    paidBy: 'John',
    date: mar8,
  },
  {
    id: '4',
    amount: 4200,
    type: 'income',
    category: categories[4],
    note: 'March salary',
    paidBy: 'John',
    date: mar1,
  },
  {
    id: '5',
    amount: 55.00,
    type: 'expense',
    category: categories[3],
    note: 'Gas fill-up',
    paidBy: 'Christina',
    date: mar7,
  },
];
