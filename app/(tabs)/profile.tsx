import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { ChevronLeft, Settings, Camera, CheckCircle, MapPin, Mail, Phone, Copy, Edit, TrendingUp, Target, Bookmark, Clock, MessageCircle, Star, Shield, LogOut, Instagram, Youtube, Facebook, Grid, Film, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

export default function InfluencerProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'posts' | 'reels'>('posts');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const categories = ['Fashion', 'Music', 'Comedy', 'Gaming'];

  const socialMedia = [
    { platform: 'Instagram', followers: '500K', icon: Instagram, connected: true, color: '#E4405F' },
    { platform: 'YouTube', followers: '250K', icon: Youtube, connected: true, color: '#FF0000' },
    { platform: 'Facebook', followers: '140K', icon: Facebook, connected: true, color: '#1877F2' },
  ];

  const contentPosts = [
    { id: 1, image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg', likes: '12.5K' },
    { id: 2, image: 'https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg', likes: '45.5K' },
    { id: 3, image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg', likes: '38.1K' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageGallery}>
          <View style={styles.imageSlot}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
              style={styles.galleryImage}
            />
          </View>
          <View style={styles.imageSlot}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' }}
              style={styles.galleryImage}
            />
          </View>
          <View style={styles.imageSlot}>
            <View style={styles.uploadSlot}>
              <Camera color={COLORS.brand.green} size={28} />
              <Text style={styles.uploadText}>Upload Image</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <CheckCircle color={COLORS.text} size={16} fill={COLORS.brand.green} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Amulya Goud</Text>
              <View style={styles.locationRow}>
                <MapPin color={COLORS.textSecondary} size={14} />
                <Text style={styles.locationText}>Hyderabad</Text>
              </View>
              <Text style={styles.bio}>Fashion & Lifestyle content creator. Making the digital world my canvas</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>245K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Star color={COLORS.warning} size={14} fill={COLORS.warning} />
                <Text style={styles.statValue}>4.9</Text>
              </View>
              <Text style={styles.statLabel}>Engagement</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.5%</Text>
              <Text style={styles.statLabel}>Rate</Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            <Mail color={COLORS.textSecondary} size={16} />
            <Text style={styles.contactText}>amulyamushcla@gmail.com</Text>
            <TouchableOpacity>
              <Copy color={COLORS.textSecondary} size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.contactRow}>
            <Phone color={COLORS.textSecondary} size={16} />
            <Text style={styles.contactText}>+91 9876543210</Text>
            <TouchableOpacity>
              <Copy color={COLORS.textSecondary} size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesRow}>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Edit color={COLORS.text} size={18} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.analyticsButton}>
              <TrendingUp color={COLORS.text} size={18} />
              <Text style={styles.analyticsButtonText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          {socialMedia.map((social, index) => {
            const Icon = social.icon;
            return (
              <View key={index} style={styles.socialCard}>
                <View style={[styles.socialIcon, { backgroundColor: social.color }]}>
                  <Icon color={COLORS.text} size={24} />
                </View>
                <View style={styles.socialInfo}>
                  <Text style={styles.socialPlatform}>{social.platform}</Text>
                  <Text style={styles.socialFollowers}>{social.followers}</Text>
                </View>
                {social.connected && <View style={styles.connectedDot} />}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.contentTabs}>
            <TouchableOpacity
              style={[styles.contentTab, selectedTab === 'posts' && styles.contentTabActive]}
              onPress={() => setSelectedTab('posts')}
            >
              <Grid color={selectedTab === 'posts' ? COLORS.text : COLORS.textTertiary} size={18} />
              <Text style={[styles.contentTabText, selectedTab === 'posts' && styles.contentTabTextActive]}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contentTab, selectedTab === 'reels' && styles.contentTabActive]}
              onPress={() => setSelectedTab('reels')}
            >
              <Film color={selectedTab === 'reels' ? COLORS.text : COLORS.textTertiary} size={18} />
              <Text style={[styles.contentTabText, selectedTab === 'reels' && styles.contentTabTextActive]}>Reels</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentGrid}>
            {contentPosts.map((post) => (
              <TouchableOpacity key={post.id} style={styles.contentItem}>
                <ImageBackground
                  source={{ uri: post.image }}
                  style={styles.contentImage}
                  imageStyle={{ borderRadius: BORDER_RADIUS.md }}
                >
                  <View style={styles.contentOverlay}>
                    <View style={styles.editIconButton}>
                      <Edit color={COLORS.text} size={16} />
                    </View>
                    <View style={styles.moreIconButton}>
                      <View style={styles.moreDot} />
                      <View style={styles.moreDot} />
                      <View style={styles.moreDot} />
                    </View>
                    <View style={styles.likesContainer}>
                      <Heart color={COLORS.text} size={12} fill={COLORS.text} />
                      <Text style={styles.likesText}>{post.likes}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <TouchableOpacity style={styles.quickLinkItem}>
            <Target color={COLORS.text} size={20} />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>My Campaigns</Text>
              <Text style={styles.quickLinkSubtitle}>View all your active campaigns</Text>
            </View>
            <View style={styles.quickLinkBadge}>
              <Text style={styles.quickLinkBadgeText}>12</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkItem}>
            <Bookmark color={COLORS.text} size={20} />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>Saved Items</Text>
              <Text style={styles.quickLinkSubtitle}>Bookmarked campaigns & influencers</Text>
            </View>
            <View style={styles.quickLinkBadge}>
              <Text style={styles.quickLinkBadgeText}>28</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkItem}>
            <Clock color={COLORS.text} size={20} />
            <View style={styles.quickLinkContent}>
              <Text style={styles.quickLinkTitle}>Activity History</Text>
              <Text style={styles.quickLinkSubtitle}>Recent actions & updates</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <TouchableOpacity style={styles.supportItem}>
            <MessageCircle color={COLORS.text} size={20} />
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Feedback</Text>
              <Text style={styles.supportSubtitle}>Share your thoughts with us</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportItem}>
            <Star color={COLORS.text} size={20} />
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Rate Us</Text>
              <Text style={styles.supportSubtitle}>Love the app? Rate us 5 stars!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportItem}>
            <Shield color={COLORS.text} size={20} />
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Terms & Conditions</Text>
              <Text style={styles.supportSubtitle}>Legal terms of service</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color={COLORS.error} size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  imageGallery: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  imageSlot: {
    flex: 1,
    aspectRatio: 0.75,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  uploadSlot: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  uploadText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.brand.green,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  avatarSection: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.lg,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.full,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.xs,
  },
  locationText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  bio: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  contactText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingVertical: SPACING.lg,
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: COLORS.cardDark,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.brand.green,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  editButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  analyticsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.cardDark,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  analyticsButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  section: {
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  socialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  socialInfo: {
    flex: 1,
  },
  socialPlatform: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  socialFollowers: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.green,
  },
  contentTabs: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  contentTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  contentTabActive: {
    backgroundColor: COLORS.brand.green,
  },
  contentTabText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
  contentTabTextActive: {
    color: COLORS.text,
  },
  contentGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  contentItem: {
    flex: 1,
    aspectRatio: 1,
  },
  contentImage: {
    width: '100%',
    height: '100%',
  },
  contentOverlay: {
    flex: 1,
    padding: SPACING.sm,
  },
  editIconButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIconButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.text,
    marginVertical: 1,
  },
  likesContainer: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  likesText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  quickLinkContent: {
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
  },
  quickLinkBadgeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  supportSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
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
    marginBottom: 100,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.error,
  },
});
