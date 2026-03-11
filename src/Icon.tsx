import React from 'react';
import {
  ShoppingCart,
  Utensils,
  Zap,
  Car,
  Briefcase,
  Laptop,
  Bell,
  Minus,
  Plus,
  Check,
  ChevronDown,
  Pencil,
  X,
  TrendingDown,
} from 'lucide-react-native';

const iconMap: Record<string, React.ComponentType<any>> = {
  ShoppingCart,
  Utensils,
  Zap,
  Car,
  Briefcase,
  Laptop,
  Bell,
  Minus,
  Plus,
  Check,
  ChevronDown,
  Pencil,
  X,
  TrendingDown,
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
