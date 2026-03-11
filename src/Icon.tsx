import React from 'react';
import {
  ShoppingCart,
  ShoppingBasket,
  Apple,
  Baby,
  Bell,
  Minus,
  Plus,
  Check,
  ChevronDown,
  Pencil,
  X,
  TrendingDown,
  TrendingUp,
} from 'lucide-react-native';

const iconMap: Record<string, React.ComponentType<any>> = {
  ShoppingCart,
  ShoppingBasket,
  Apple,
  Baby,
  Bell,
  Minus,
  Plus,
  Check,
  ChevronDown,
  Pencil,
  X,
  TrendingDown,
  TrendingUp,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 20, color = '#000' }: IconProps) {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} />;
}
