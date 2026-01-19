import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, MoreVertical, Calendar, MapPin, User, Users, Youtube, Instagram, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface CampaignCardProps {
  id: string;
  title: string;
  brandName: string;
  budgetRange: string;
  image: string;
  status?: 'New' | 'Ongoing' | 'On Hold' | 'Completed';
  progress?: number;
  category: string;
  dateRange: string;
  location: string;
  targetAge: string;
  targetGender: string;
  targetFollowers: string;
  applicants: number;
  platforms: ('youtube' | 'instagram')[];
  onPress?: () => void;
  onBookmark?: () => void;
  onMenu?: () => void;
}

export default function CampaignCard({
  title,
  brandName,
  budgetRange,
  image,
  status,
  progress,
  category,
  dateRange,
  location,
  targetAge,
  targetGender,
  targetFollowers,
  applicants,
  platforms,
  onPress,
  onBookmark,
  onMenu,
}: CampaignCardProps) {
  const showProgress = status === 'Ongoing' && typeof progress === 'number';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandText}>{brandName}</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton} onPress={onBookmark}>
                <Bookmark color={COLORS.text} size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={onMenu}>
                <MoreVertical color={COLORS.text} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.budgetBadge}>
            <Text style={styles.budgetText}>{budgetRange}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.category}>{category}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Calendar color={COLORS.textSecondary} size={14} />
                <Text style={styles.infoText}>{dateRange}</Text>
              </View>
              <View style={styles.infoItem}>
                <MapPin color={COLORS.textSecondary} size={14} />
                <Text style={styles.infoText}>{location}</Text>
              </View>
            </View>

            <View style={styles.targetRow}>
              <View style={styles.targetItem}>
                <User color={COLORS.textSecondary} size={14} />
                <Text style={styles.targetText}>{targetAge}, {targetGender}</Text>
              </View>
              <View style={styles.targetItem}>
                <Users color={COLORS.textSecondary} size={14} />
                <Text style={styles.targetText}>{targetFollowers}</Text>
              </View>
            </View>

            {showProgress && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressPercent}>{progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            )}

            <View style={styles.footer}>
              <View style={styles.applicantsSection}>
                <View style={styles.platformIcons}>
                  {platforms.includes('youtube') && (
                    <View style={styles.platformIcon}>
                      <Youtube color={COLORS.text} size={18} fill="#FF0000" />
                    </View>
                  )}
                  {platforms.includes('instagram') && (
                    <View style={styles.platformIcon}>
                      <Instagram color={COLORS.text} size={18} />
                    </View>
                  )}
                </View>
                <Text style={styles.applicantsText}>{applicants} applied</Text>
              </View>

              <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
                <Text style={styles.detailsText}>View Details</Text>
                <ChevronRight color={COLORS.text} size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  image: {
    width: '100%',
    height: 380,
  },
  imageStyle: {
    borderRadius: BORDER_RADIUS.xl,
  },
  gradient: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
  },
  brandText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetBadge: {
    position: 'absolute',
    top: 170,
    right: SPACING.lg,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  budgetText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  targetRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  targetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  targetText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  progressSection: {
    marginTop: SPACING.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  progressPercent: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  applicantsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  platformIcons: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  platformIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicantsText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
});
