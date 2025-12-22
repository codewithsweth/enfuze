import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const getGradientColors = (): [string, string] => {
    switch (variant) {
      case 'primary':
        return [...COLORS.gradient.primary] as [string, string];
      case 'secondary':
        return [...COLORS.gradient.secondary] as [string, string];
      default:
        return ['transparent', 'transparent'];
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.md,
      overflow: 'hidden',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (variant === 'outline') {
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = COLORS.border;
    }

    return baseStyle;
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: 10, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: variant === 'outline' ? COLORS.text : COLORS.text,
      fontWeight: '600',
      textAlign: 'center',
    };

    switch (size) {
      case 'small':
        baseStyle.fontSize = FONT_SIZES.sm;
        break;
      case 'large':
        baseStyle.fontSize = FONT_SIZES.lg;
        break;
      default:
        baseStyle.fontSize = FONT_SIZES.base;
    }

    return baseStyle;
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[getPaddingStyle(), getTextStyle()]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={disabled ? ['#374151', '#1F2937'] : getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, getPaddingStyle()]}
      >
        <Text style={getTextStyle()}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
