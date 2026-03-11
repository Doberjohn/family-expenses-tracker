import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';

import { colors, fonts } from './src/theme';
import { Category, PaidBy, TransactionType } from './src/types';
import { useTransactions } from './src/useTransactions';
import BalanceCard from './src/BalanceCard';
import TransactionRow from './src/TransactionRow';
import AddEntrySheet from './src/AddEntrySheet';
import Icon from './src/Icon';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });

  const { transactions, total, loading, addTransaction } = useTransactions();
  const [sheetType, setSheetType] = useState<TransactionType>('expense');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openSheet = useCallback((type: TransactionType) => {
    setSheetType(type);
    bottomSheetRef.current?.expand();
  }, []);

  const handleAdd = useCallback((entry: { amount: number; category: Category; note: string; paidBy: PaidBy; type: TransactionType }) => {
    addTransaction(entry);
  }, [addTransaction]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.names}>John & Christina</Text>
            </View>
            <TouchableOpacity>
              <Icon name="Bell" size={24} color={colors.dark} />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <BalanceCard total={total} />

          {/* Action Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.expenseBtn} onPress={() => openSheet('expense')}>
              <Icon name="Minus" size={18} color={colors.white} />
              <Text style={styles.expenseBtnText}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.incomeBtn} onPress={() => openSheet('income')}>
              <Icon name="Plus" size={18} color={colors.dark} />
              <Text style={styles.incomeBtnText}>Income</Text>
            </TouchableOpacity>
          </View>

          {/* Transactions */}
          <View style={styles.txnHeader}>
            <Text style={styles.txnTitle}>Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionRow transaction={item} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>

      <AddEntrySheet ref={bottomSheetRef} type={sheetType} onAdd={handleAdd} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
  },
  names: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.dark,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  expenseBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.dark,
    gap: 8,
  },
  expenseBtnText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
  incomeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    gap: 8,
  },
  incomeBtnText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.dark,
  },
  txnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txnTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.dark,
  },
  seeAll: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.coral,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
});
