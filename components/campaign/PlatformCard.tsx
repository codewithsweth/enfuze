import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Instagram, Youtube, Facebook } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import type { Platform } from '@/types/campaign';

interface PlatformCardProps {
  platform: Platform;
  selected: boolean;
  onPress: () => void;
}

export default function PlatformCard({ platform, selected, onPress }: PlatformCardProps) {
  const getPlatformIcon = () => {
    switch (platform.id) {
      case 'instagram':
        return <Instagram color={COLORS.text} size={32} />;
      case 'youtube':
        return <Youtube color={COLORS.text} size={32} />;
      case 'facebook':
        return <Facebook color={COLORS.text} size={32} />;
      case 'x':
        return <Text style={styles.xIcon}>𝕏</Text>;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && {
          backgroundColor: platform.color,
          borderColor: 'transparent',
        },
      ]}
      onPress={onPress}
    >
      {getPlatformIcon()}
      <Text style={styles.name}>{platform.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  xIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
