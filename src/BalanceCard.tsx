import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from './theme';
import Icon from './Icon';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface BalanceCardProps {
  total: number;
  previousMonthTotal: number;
}

export default function BalanceCard({ total, previousMonthTotal }: BalanceCardProps) {
  const now = new Date();
  const currentMonthName = MONTH_NAMES[now.getMonth()];
  const prevMonthName = SHORT_MONTH_NAMES[(now.getMonth() + 11) % 12];

  const comparison = useMemo(() => {
    if (previousMonthTotal === 0) return null;
    const diff = ((total - previousMonthTotal) / Math.abs(previousMonthTotal)) * 100;
    const absDiff = Math.abs(Math.round(diff));
    const isMore = diff > 0;
    return { absDiff, isMore };
  }, [total, previousMonthTotal]);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance — {currentMonthName}</Text>
      <Text style={styles.amount}>€{total.toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
      {comparison && comparison.absDiff > 0 && (
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Icon name={comparison.isMore ? 'TrendingUp' : 'TrendingDown'} size={14} color={colors.white} />
            <Text style={styles.badgeText}>
              {comparison.absDiff}% {comparison.isMore ? 'more' : 'less'} than {prevMonthName}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.purple,
    borderRadius: radii.card,
    padding: 20,
    gap: 12,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  amount: {
    fontFamily: fonts.headingBlack,
    fontSize: 32,
    color: colors.white,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.white,
  },
});
