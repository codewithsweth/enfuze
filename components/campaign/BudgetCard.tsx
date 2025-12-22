import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import type { BudgetRange } from '@/types/campaign';

interface BudgetCardProps {
  range: BudgetRange;
  selected: boolean;
  onPress: () => void;
}

export default function BudgetCard({ range, selected, onPress }: BudgetCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {range.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  containerSelected: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  text: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  textSelected: {
    color: COLORS.text,
  },
});
