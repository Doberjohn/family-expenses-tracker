import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from './theme';
import Icon from './Icon';

interface BalanceCardProps {
  total: number;
}

export default function BalanceCard({ total }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance — March</Text>
      <Text style={styles.amount}>€{total.toLocaleString('en', { minimumFractionDigits: 2 })}</Text>
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Icon name="TrendingDown" size={14} color={colors.white} />
          <Text style={styles.badgeText}>12% less than Feb</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.coral,
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
