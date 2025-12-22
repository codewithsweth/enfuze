import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Instagram, Youtube, Facebook } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface TopInfluencerCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  rank?: number;
  instagramFollowers: string;
  youtubeFollowers: string;
  facebookFollowers: string;
  onPress?: () => void;
}

export default function TopInfluencerCard({
  name,
  category,
  image,
  rating,
  rank,
  instagramFollowers,
  youtubeFollowers,
  facebookFollowers,
  onPress,
}: TopInfluencerCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {rank && (
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{rank}</Text>
        </View>
      )}
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={styles.rating}>
          <Star color={COLORS.warning} size={14} fill={COLORS.warning} />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Instagram color={COLORS.textSecondary} size={16} />
            <Text style={styles.statText}>{instagramFollowers}</Text>
          </View>
          <View style={styles.statItem}>
            <Youtube color={COLORS.textSecondary} size={16} />
            <Text style={styles.statText}>{youtubeFollowers}</Text>
          </View>
          <View style={styles.statItem}>
            <Facebook color={COLORS.textSecondary} size={16} />
            <Text style={styles.statText}>{facebookFollowers}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rankBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.brand.green,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    zIndex: 1,
  },
  rankText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.cardLight,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.brand.green,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.sm,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
