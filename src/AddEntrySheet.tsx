import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Animated } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors, fonts, radii } from './theme';
import { categories } from './data';
import { Category, PaidBy, TransactionType } from './types';
import Icon from './Icon';

interface AddEntrySheetProps {
  type: TransactionType;
  onAdd: (entry: { amount: number; category: Category; note: string; paidBy: PaidBy; type: TransactionType }) => void;
}

const AddEntrySheet = forwardRef<BottomSheet, AddEntrySheetProps>(({ type, onAdd }, ref) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [paidBy, setPaidBy] = useState<PaidBy>('Christina');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [amountFocused, setAmountFocused] = useState(false);
  const amountRef = useRef<TextInput>(null);
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  const showCursor = amountFocused && amount === '';

  useEffect(() => {
    if (showCursor) {
      const blink = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(cursorOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      );
      blink.start();
      return () => blink.stop();
    } else {
      cursorOpacity.setValue(0);
    }
  }, [showCursor]);

  const isExpense = type === 'expense';
  const relevantCategories = categories;

  const snapPoints = useMemo(() => ['62%'], []);

  const handleAdd = () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) return;
    onAdd({
      amount: parsed,
      category: relevantCategories[categoryIndex],
      note,
      paidBy,
      type,
    });
    setAmount('');
    setNote('');
    setPaidBy('Christina');
    setCategoryIndex(0);
    (ref as any)?.current?.close();
  };

  const cycleCategory = () => {
    setCategoryIndex((i) => (i + 1) % relevantCategories.length);
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />,
    []
  );

  const currentCategory = relevantCategories[categoryIndex];

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.handle}
      onChange={(index) => {
        if (index === -1) Keyboard.dismiss();
        else setTimeout(() => amountRef.current?.focus(), 100);
      }}
    >
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{isExpense ? 'New Expense' : 'New Income'}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={() => (ref as any)?.current?.close()}>
            <Icon name="X" size={16} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountRow}>
            <Text style={styles.eurSign}>€</Text>
            {showCursor && (
              <Animated.View style={[styles.fakeCursor, { opacity: cursorOpacity }]} />
            )}
            <BottomSheetTextInput
              ref={amountRef}
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.muted}
              keyboardType="decimal-pad"
              selectionColor={colors.coral}
              tintColor={colors.coral}
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
            />
          </View>
          <View style={[styles.amountUnderline, amountFocused && styles.amountUnderlineActive]} />
        </View>

        <View style={styles.fields}>
          <TouchableOpacity style={styles.fieldRow} onPress={cycleCategory}>
            <View style={styles.fieldLeft}>
              <Icon name={currentCategory.icon} size={18} color={currentCategory.color} />
              <Text style={styles.fieldText}>{currentCategory.name}</Text>
            </View>
            <Icon name="ChevronDown" size={18} color={colors.muted} />
          </TouchableOpacity>

          <View style={styles.fieldRow}>
            <Icon name="Pencil" size={18} color={colors.muted} />
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="Add a note..."
              placeholderTextColor={colors.muted}
            />
          </View>

          <View style={styles.paidByRow}>
            <TouchableOpacity
              style={[styles.paidByBtn, paidBy === 'John' && styles.paidByActive]}
              onPress={() => setPaidBy('John')}
            >
              <View style={[styles.avatar, paidBy === 'John' ? styles.avatarActive : styles.avatarInactive]}>
                <Text style={[styles.avatarText, paidBy === 'John' && styles.avatarTextActive]}>J</Text>
              </View>
              <Text style={[styles.paidByText, paidBy === 'John' && styles.paidByTextActive]}>John</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paidByBtn, paidBy === 'Christina' && styles.paidByActive]}
              onPress={() => setPaidBy('Christina')}
            >
              <View style={[styles.avatar, paidBy === 'Christina' ? styles.avatarActive : styles.avatarInactive]}>
                <Text style={[styles.avatarText, paidBy === 'Christina' && styles.avatarTextActive]}>C</Text>
              </View>
              <Text style={[styles.paidByText, paidBy === 'Christina' && styles.paidByTextActive]}>Christina</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleAdd}>
          <Icon name="Check" size={20} color={colors.white} />
          <Text style={styles.submitText}>{isExpense ? 'Add Expense' : 'Add Income'}</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default AddEntrySheet;

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    backgroundColor: colors.border,
    width: 40,
    height: 4,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 8,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.dark,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountSection: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  amountLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.muted,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  eurSign: {
    fontFamily: fonts.headingBlack,
    fontSize: 40,
    color: colors.dark,
  },
  fakeCursor: {
    width: 2,
    height: 36,
    backgroundColor: colors.coral,
    marginLeft: 4,
  },
  amountInput: {
    fontFamily: fonts.headingBlack,
    fontSize: 40,
    color: colors.dark,
    minWidth: 80,
    textAlign: 'center',
  },
  amountUnderline: {
    width: 120,
    height: 2,
    backgroundColor: colors.border,
    borderRadius: 1,
  },
  amountUnderlineActive: {
    backgroundColor: colors.coral,
  },
  fields: {
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radii.input,
    height: 48,
    paddingHorizontal: 16,
    gap: 10,
  },
  fieldLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fieldText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.dark,
  },
  noteInput: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.dark,
  },
  paidByRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paidByBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: radii.input,
    backgroundColor: colors.cardBg,
    gap: 8,
  },
  paidByActive: {
    backgroundColor: colors.dark,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  avatarInactive: {
    backgroundColor: colors.border,
  },
  avatarText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: colors.muted,
  },
  avatarTextActive: {
    color: colors.white,
  },
  paidByText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.muted,
  },
  paidByTextActive: {
    fontFamily: fonts.bodySemiBold,
    color: colors.white,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: radii.card,
    backgroundColor: colors.coral,
    gap: 8,
  },
  submitText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  },
});
