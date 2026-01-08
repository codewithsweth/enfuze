import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Edit, TrendingUp, Star, MapPin, Calendar, Mail, Phone, Globe, Copy, ExternalLink, Instagram, Facebook, Youtube, Plus, Target, Bookmark, Users, Clock, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

export default function BrandProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>

          <View style={styles.profileHeaderInfo}>
            <Text style={styles.brandName}>Nike</Text>
            <Text style={styles.brandRole}>Brand Manager @ priya sharma</Text>

            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <MapPin color={COLORS.textSecondary} size={12} />
                <Text style={styles.badgeText}>Mumbai</Text>
              </View>
              <View style={styles.badge}>
                <Calendar color={COLORS.textSecondary} size={12} />
                <Text style={styles.badgeText}>Joined 2025</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <Star color={COLORS.warning} size={16} fill={COLORS.warning} />
              <Star color={COLORS.warning} size={16} fill={COLORS.warning} />
              <Star color={COLORS.warning} size={16} fill={COLORS.warning} />
              <Star color={COLORS.warning} size={16} fill={COLORS.warning} />
              <Star color={COLORS.warning} size={16} fill={COLORS.warning} />
              <Text style={styles.ratingText}>4.0</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/profile/edit-brand')}>
            <Edit color={COLORS.text} size={18} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.analyticsButton}>
            <TrendingUp color={COLORS.text} size={18} />
            <Text style={styles.analyticsButtonText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <View style={styles.aboutHeader}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' }}
                style={styles.brandLogo}
              />
              <View style={styles.aboutHeaderInfo}>
                <Text style={styles.aboutBrandName}>Nike</Text>
                <Text style={styles.aboutIndustry}>Sports & Lifestyle Brand</Text>
                <View style={styles.aboutBadges}>
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium Member</Text>
                  </View>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedBadgeText}>Verified</Text>
                    <View style={styles.verifiedIcon} />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.aboutDescription}>
              Leading global sports brand focused on innovative products and authentic athlete partnerships. We work with top influencers to connect with Gen-Z audiences.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.contactCard}>
            <View style={styles.contactIconContainer}>
              <Mail color={COLORS.brand.green} size={20} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email Address</Text>
              <Text style={styles.contactValue}>john.carter@nike.com</Text>
            </View>
            <TouchableOpacity style={styles.contactAction}>
              <Copy color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactIconContainer}>
              <Phone color={COLORS.brand.green} size={20} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone Number</Text>
              <Text style={styles.contactValue}>+91 98765 43210</Text>
            </View>
            <TouchableOpacity style={styles.contactAction}>
              <Copy color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.contactIconContainer}>
              <Globe color={COLORS.brand.green} size={20} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>www.nike.com</Text>
            </View>
            <TouchableOpacity style={styles.contactAction}>
              <ExternalLink color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.socialGrid}>
            <View style={styles.socialCard}>
              <View style={[styles.socialIcon, { backgroundColor: '#E4405F' }]}>
                <Instagram color={COLORS.text} size={24} />
              </View>
              <Text style={styles.socialName}>Instagram</Text>
              <View style={styles.socialConnected} />
            </View>

            <View style={styles.socialCard}>
              <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
                <Facebook color={COLORS.text} size={24} />
              </View>
              <Text style={styles.socialName}>Facebook</Text>
              <View style={styles.socialConnected} />
            </View>

            <View style={styles.socialCard}>
              <View style={[styles.socialIcon, { backgroundColor: '#FF0000' }]}>
                <Youtube color={COLORS.text} size={24} />
              </View>
              <Text style={styles.socialName}>YouTube</Text>
              <View style={styles.socialConnected} />
            </View>

            <View style={styles.socialCard}>
              <View style={styles.socialIconAdd}>
                <Plus color={COLORS.textSecondary} size={24} />
              </View>
              <Text style={[styles.socialName, { color: COLORS.textSecondary }]}>Add</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>

          <TouchableOpacity style={styles.quickLinkCard}>
            <View style={[styles.quickLinkIcon, { backgroundColor: 'rgba(0, 208, 158, 0.15)' }]}>
              <Target color={COLORS.brand.green} size={24} />
            </View>
            <View style={styles.quickLinkInfo}>
              <Text style={styles.quickLinkTitle}>My Campaigns</Text>
              <Text style={styles.quickLinkSubtitle}>View all your active campaigns</Text>
            </View>
            <View style={styles.quickLinkBadge}>
              <Text style={styles.quickLinkBadgeText}>12</Text>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkCard}>
            <View style={[styles.quickLinkIcon, { backgroundColor: 'rgba(228, 64, 95, 0.15)' }]}>
              <Bookmark color="#E4405F" size={24} />
            </View>
            <View style={styles.quickLinkInfo}>
              <Text style={styles.quickLinkTitle}>Saved Items</Text>
              <Text style={styles.quickLinkSubtitle}>Bookmarked campaigns & influencers</Text>
            </View>
            <View style={[styles.quickLinkBadge, { backgroundColor: '#E4405F' }]}>
              <Text style={styles.quickLinkBadgeText}>28</Text>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkCard}>
            <View style={[styles.quickLinkIcon, { backgroundColor: 'rgba(24, 119, 242, 0.15)' }]}>
              <Users color="#1877F2" size={24} />
            </View>
            <View style={styles.quickLinkInfo}>
              <Text style={styles.quickLinkTitle}>Team Members</Text>
              <Text style={styles.quickLinkSubtitle}>Manage your team access</Text>
            </View>
            <View style={[styles.quickLinkBadge, { backgroundColor: '#1877F2' }]}>
              <Text style={styles.quickLinkBadgeText}>3</Text>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkCard}>
            <View style={[styles.quickLinkIcon, { backgroundColor: 'rgba(255, 159, 10, 0.15)' }]}>
              <Clock color="#FF9F0A" size={24} />
            </View>
            <View style={styles.quickLinkInfo}>
              <Text style={styles.quickLinkTitle}>Activity History</Text>
              <Text style={styles.quickLinkSubtitle}>Recent actions & updates</Text>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color={COLORS.error} size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.brand.green,
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  profileHeaderInfo: {
    gap: SPACING.xs,
  },
  brandName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  brandRole: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.brand.green,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  editButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  analyticsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  analyticsButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  section: {
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  aboutCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
  },
  aboutHeader: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  brandLogo: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
  },
  aboutHeaderInfo: {
    flex: 1,
  },
  aboutBrandName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  aboutIndustry: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  aboutBadges: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  premiumBadge: {
    backgroundColor: COLORS.cardDark,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  premiumBadgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.cardDark,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  verifiedBadgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
  },
  verifiedIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.brand.green,
  },
  aboutDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 208, 158, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  contactAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  socialCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    position: 'relative',
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  socialIconAdd: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  socialName: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  socialConnected: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.green,
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  quickLinkInfo: {
    flex: 1,
  },
  quickLinkTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  quickLinkSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  quickLinkBadge: {
    backgroundColor: COLORS.brand.green,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  quickLinkBadgeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.error,
  },
  bottomSpacing: {
    height: 100,
  },
});
