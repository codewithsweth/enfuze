import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface CampaignCardProps {
  id: string;
  title: string;
  budget?: string;
  budgetRange?: string;
  image: string;
  status?: 'Active' | 'Draft' | 'Completed';
  progress?: number;
  categories?: string[];
  onPress?: () => void;
}

export default function CampaignCard({
  title,
  budget,
  budgetRange,
  image,
  status,
  progress,
  categories,
  onPress,
}: CampaignCardProps) {
  const showProgress = typeof progress === 'number';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.gradient}
        >
          {status && (
            <View style={[styles.statusBadge, status === 'Active' && styles.statusActive]}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
          {budgetRange && (
            <View style={styles.budgetBadge}>
              <Text style={styles.budgetText}>{budgetRange}</Text>
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {categories && categories.length > 0 && (
              <View style={styles.categories}>
                {categories.map((category, index) => (
                  <Text key={index} style={styles.category}>
                    {category}
                  </Text>
                ))}
              </View>
            )}
            {budget && <Text style={styles.budget}>{budget}</Text>}
            {showProgress && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: BORDER_RADIUS.lg,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING.lg,
  },
  statusBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.textTertiary,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
  },
  statusActive: {
    backgroundColor: COLORS.brand.green,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  budgetBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.brand.green,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
  },
  budgetText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    gap: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  categories: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  category: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.brand.green,
  },
  budget: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.brand.green,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.brand.green,
  },
  progressText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 35,
    textAlign: 'right',
  },
});
