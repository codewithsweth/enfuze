import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
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
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(true);
    if (onMenu) onMenu();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={styles.imageStyle}>
          <View style={styles.imageOverlay}>
            <View style={styles.header}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{brandName}</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.iconButton} onPress={onBookmark}>
                  <Bookmark color={COLORS.text} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
                  <MoreVertical color={COLORS.text} size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.budgetBadge}>
              <Text style={styles.budgetText}>{budgetRange}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{category}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Calendar color={COLORS.textSecondary} size={16} />
            <Text style={styles.infoText}>{dateRange}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin color={COLORS.textSecondary} size={16} />
            <Text style={styles.infoText}>{location}</Text>
          </View>
        </View>

        <View style={styles.targetRow}>
          <View style={styles.targetItem}>
            <User color={COLORS.textSecondary} size={16} />
            <Text style={styles.targetText}>{targetAge}, {targetGender}</Text>
          </View>
          <View style={styles.targetItem}>
            <Users color={COLORS.textSecondary} size={16} />
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
                <View style={styles.platformIconYoutube}>
                  <Youtube color="#FFFFFF" size={20} fill="#FF0000" />
                </View>
              )}
              {platforms.includes('instagram') && (
                <View style={styles.platformIconInstagram}>
                  <Instagram color="#FFFFFF" size={20} />
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

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuText}>Edit Campaign</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuText}>Put on Hold</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuTextDanger}>Withdraw Campaign</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuTextSuccess}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    backgroundColor: '#1A1A1A',
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  imageOverlay: {
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl,
  },
  brandText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  budgetBadge: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  budgetText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  contentSection: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.sm,
  },
  categoryRow: {
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    fontWeight: '400',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 34,
  },
  infoRow: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  targetRow: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginBottom: SPACING.md,
  },
  targetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  targetText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  progressPercent: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    marginTop: SPACING.sm,
  },
  applicantsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  platformIcons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  platformIconYoutube: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformIconInstagram: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#E1306C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applicantsText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    fontWeight: '400',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  detailsText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#1E1E2E',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  menuText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    fontWeight: '400',
  },
  menuTextDanger: {
    fontSize: FONT_SIZES.lg,
    color: '#EF4444',
    fontWeight: '400',
  },
  menuTextSuccess: {
    fontSize: FONT_SIZES.lg,
    color: '#10B981',
    fontWeight: '400',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
