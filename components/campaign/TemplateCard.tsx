import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import type { CampaignTemplate } from '@/types/campaign';

interface TemplateCardProps {
  template: CampaignTemplate;
  onPress: () => void;
}

export default function TemplateCard({ template, onPress }: TemplateCardProps) {
  const Icon = template.icon;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.icon, { backgroundColor: template.color }]}>
        <Icon color={COLORS.text} size={28} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{template.name}</Text>
        <Text style={styles.description}>{template.description}</Text>
      </View>
      <View style={styles.addIcon}>
        <Plus color={COLORS.textTertiary} size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  addIcon: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
