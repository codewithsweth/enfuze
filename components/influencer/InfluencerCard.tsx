import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Instagram, Youtube, Facebook } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface InfluencerCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  instagramFollowers?: string;
  youtubeFollowers?: string;
  facebookFollowers?: string;
  onPress?: () => void;
  onFavorite?: () => void;
}

export default function InfluencerCard({
  name,
  category,
  image,
  instagramFollowers,
  youtubeFollowers,
  facebookFollowers,
  onPress,
  onFavorite,
}: InfluencerCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
            <Heart color={COLORS.text} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={styles.stats}>
          {instagramFollowers && (
            <View style={styles.stat}>
              <Instagram color={COLORS.secondary} size={14} />
              <Text style={styles.statText}>{instagramFollowers}</Text>
            </View>
          )}
          {youtubeFollowers && (
            <View style={styles.stat}>
              <Youtube color="#FF0000" size={14} />
              <Text style={styles.statText}>{youtubeFollowers}</Text>
            </View>
          )}
          {facebookFollowers && (
            <View style={styles.stat}>
              <Facebook color="#1877F2" size={14} />
              <Text style={styles.statText}>{facebookFollowers}</Text>
            </View>
          )}
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
  image: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.cardLight,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  favoriteButton: {
    padding: 4,
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
  stats: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
