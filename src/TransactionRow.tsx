import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from './theme';
import { Transaction } from './types';
import Icon from './Icon';

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const txDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (txDate.getTime() === today.getTime()) return 'Today';
  if (txDate.getTime() === yesterday.getTime()) return 'Yesterday';
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const { amount, type, category, paidBy, date } = transaction;
  const isIncome = type === 'income';
  const amountStr = isIncome
    ? `+€${amount.toLocaleString('en', { minimumFractionDigits: amount % 1 === 0 ? 0 : 2 })}`
    : `-€${amount.toLocaleString('en', { minimumFractionDigits: 2 })}`;

  return (
    <View style={styles.row}>
      <View style={[styles.iconContainer, { backgroundColor: category.bgColor }]}>
        <Icon name={category.icon} size={20} color={category.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.sub}>{paidBy} · {formatDate(date)}</Text>
      </View>
      <Text style={[styles.amount, isIncome && styles.incomeAmount]}>{amountStr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radii.input,
    padding: 14,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.iconContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.dark,
  },
  sub: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.muted,
  },
  amount: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.dark,
  },
  incomeAmount: {
    color: colors.green,
  },
});
