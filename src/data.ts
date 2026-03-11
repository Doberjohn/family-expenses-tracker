import { Category } from './types';
import { colors } from './theme';

export const categories: Category[] = [
  { name: 'Λαϊκή', icon: 'ShoppingBasket', color: colors.amber, bgColor: colors.amberBg, type: 'expense' },
  { name: 'Supermarket', icon: 'ShoppingCart', color: colors.indigo, bgColor: colors.indigoBg, type: 'expense' },
  { name: 'Διατροφολόγος', icon: 'Apple', color: colors.green, bgColor: colors.greenBg, type: 'expense' },
  { name: 'Φαγητό', icon: 'Utensils', color: colors.indigo, bgColor: colors.indigoBg, type: 'expense' },
  { name: 'Καφές', icon: 'Coffee', color: colors.amber, bgColor: colors.amberBg, type: 'expense' },
  { name: 'Εύα', icon: 'Dumbbell', color: colors.coral, bgColor: colors.redBg, type: 'expense' },
  { name: 'Ανανέωση υπολοίπου', icon: 'RefreshCw', color: colors.green, bgColor: colors.greenBg, type: 'income' },
  { name: 'Άλλο', icon: 'MoreHorizontal', color: colors.muted, bgColor: colors.cardBg, type: 'both' },
];
