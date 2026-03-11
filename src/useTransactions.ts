import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { categories } from './data';
import { Category, PaidBy, Transaction, TransactionType } from './types';

const COLLECTION = 'transactions';

interface FirestoreDoc {
  amount: number;
  type: TransactionType;
  category: string;
  note: string;
  paidBy: PaidBy;
  date: Timestamp;
  createdAt: Timestamp;
}

function resolveCategory(name: string): Category {
  return categories.find((c) => c.name === name) || categories[0];
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txns: Transaction[] = snapshot.docs.map((d) => {
        const data = d.data() as FirestoreDoc;
        return {
          id: d.id,
          amount: data.amount,
          type: data.type,
          category: resolveCategory(data.category),
          note: data.note,
          paidBy: data.paidBy,
          date: data.date.toDate(),
        };
      });
      setTransactions(txns);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const prevDate = new Date(currentYear, currentMonth - 1, 1);
  const prevMonth = prevDate.getMonth();
  const prevYear = prevDate.getFullYear();

  const total = useMemo(() => {
    return transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
  }, [transactions]);

  const currentMonthTotal = useMemo(() => {
    return transactions
      .filter((t) => t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear)
      .reduce((sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount), 0);
  }, [transactions, currentMonth, currentYear]);

  const previousMonthTotal = useMemo(() => {
    return transactions
      .filter((t) => t.date.getMonth() === prevMonth && t.date.getFullYear() === prevYear)
      .reduce((sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount), 0);
  }, [transactions, prevMonth, prevYear]);

  const addTransaction = async (entry: {
    amount: number;
    category: Category;
    note: string;
    paidBy: PaidBy;
    type: TransactionType;
  }) => {
    await addDoc(collection(db, COLLECTION), {
      amount: entry.amount,
      type: entry.type,
      category: entry.category.name,
      note: entry.note,
      paidBy: entry.paidBy,
      date: Timestamp.now(),
      createdAt: Timestamp.now(),
    });
  };

  const deleteTransaction = async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
  };

  return { transactions, total, currentMonthTotal, previousMonthTotal, loading, addTransaction, deleteTransaction };
}
