import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bookmark,
  MoreVertical,
  MapPin,
  Users,
  User as UserIcon,
  Youtube,
  Instagram,
} from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

export default function CampaignDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const campaign = {
    id: params.id,
    title: 'Summer Fashion Collection Launch',
    brandName: 'Zara India',
    budgetRange: '₹50K - ₹1L',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    description: 'Showcase our new summer collection through creative reels and stories',
    category: 'Fashion',
    milestones: [
      { id: 1, title: 'Milestone 1', description: 'Reach 50K impressions', amount: '₹25,000' },
      { id: 2, title: 'Milestone 2', description: 'Achieve 5K engagement', amount: '₹30,000' },
      { id: 3, title: 'Milestone 3', description: 'Complete campaign delivery', amount: '₹20,000' },
    ],
    contentRequirements: {
      reels: 3,
      stories: 5,
      posts: 2,
    },
    duration: {
      startDate: 'Dec 15, 2025',
      endDate: 'Jan 9, 2026',
    },
    platforms: ['instagram', 'youtube'] as ('instagram' | 'youtube')[],
    targetAudience: {
      ageRange: '18k-35k years',
      followerRange: '10-25 Followers',
      gender: 'Female',
      location: 'Mumbai, Delhi, Bangalore',
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaign Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: campaign.image }} style={styles.image}>
            <View style={styles.imageOverlay}>
              <View style={styles.imageHeader}>
                <View style={styles.brandBadge}>
                  <Text style={styles.brandText}>{campaign.brandName}</Text>
                </View>
                <View style={styles.imageActions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Bookmark color={COLORS.text} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <MoreVertical color={COLORS.text} size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.budgetBadge}>
                <Text style={styles.budgetText}>{campaign.budgetRange}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          <Text style={styles.description}>{campaign.description}</Text>

          <View style={styles.categoryContainer}>
            <Text style={styles.sectionLabel}>Category</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{campaign.category}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Milestones</Text>
            <View style={styles.milestonesContainer}>
              {campaign.milestones.map((milestone) => (
                <View key={milestone.id} style={styles.milestoneCard}>
                  <View style={styles.milestoneContent}>
                    <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                    <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                  </View>
                  <Text style={styles.milestoneAmount}>{milestone.amount}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content Requirements</Text>
            <View style={styles.contentRequirementsContainer}>
              <View style={styles.requirementItem}>
                <Text style={styles.requirementLabel}>Reels</Text>
                <Text style={styles.requirementValue}>{campaign.contentRequirements.reels}</Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={styles.requirementLabel}>Stories</Text>
                <Text style={styles.requirementValue}>{campaign.contentRequirements.stories}</Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={styles.requirementLabel}>Posts</Text>
                <Text style={styles.requirementValue}>{campaign.contentRequirements.posts}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Duration</Text>
            <View style={styles.durationContainer}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{campaign.duration.startDate}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{campaign.duration.endDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Platforms</Text>
            <View style={styles.platformsContainer}>
              {campaign.platforms.includes('instagram') && (
                <View style={styles.platformBadge}>
                  <Instagram color="#FFFFFF" size={20} />
                  <Text style={styles.platformText}>Instagram</Text>
                </View>
              )}
              {campaign.platforms.includes('youtube') && (
                <View style={styles.platformBadgeYoutube}>
                  <Youtube color="#FFFFFF" size={20} />
                  <Text style={styles.platformText}>Youtube</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Target Audience</Text>
            <View style={styles.audienceContainer}>
              <View style={styles.audienceCard}>
                <View style={styles.audienceIcon}>
                  <UserIcon color={COLORS.textSecondary} size={24} />
                </View>
                <View style={styles.audienceContent}>
                  <Text style={styles.audienceLabel}>Age Range</Text>
                  <Text style={styles.audienceValue}>{campaign.targetAudience.ageRange}</Text>
                </View>
              </View>

              <View style={styles.audienceCard}>
                <View style={styles.audienceIcon}>
                  <Users color={COLORS.textSecondary} size={24} />
                </View>
                <View style={styles.audienceContent}>
                  <Text style={styles.audienceLabel}>Follower Range</Text>
                  <Text style={styles.audienceValue}>{campaign.targetAudience.followerRange}</Text>
                </View>
              </View>

              <View style={styles.audienceCard}>
                <View style={styles.audienceIcon}>
                  <Users color={COLORS.textSecondary} size={24} />
                </View>
                <View style={styles.audienceContent}>
                  <Text style={styles.audienceLabel}>Target Gender</Text>
                  <Text style={styles.audienceValue}>{campaign.targetAudience.gender}</Text>
                </View>
              </View>

              <View style={styles.audienceCard}>
                <View style={styles.audienceIcon}>
                  <MapPin color={COLORS.textSecondary} size={24} />
                </View>
                <View style={styles.audienceContent}>
                  <Text style={styles.audienceLabel}>Target Location</Text>
                  <Text style={styles.audienceValue}>{campaign.targetAudience.location}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Invite Influencers</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
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
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  imageHeader: {
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
  imageActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  budgetBadge: {
    alignSelf: 'flex-end',
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
  detailsSection: {
    padding: SPACING.lg,
  },
  campaignTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  categoryContainer: {
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  categoryText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    fontWeight: '500',
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  milestonesContainer: {
    gap: SPACING.md,
  },
  milestoneCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    fontWeight: '500',
  },
  milestoneAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  contentRequirementsContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  requirementItem: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  requirementLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  requirementValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  dateItem: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  dateLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  dateValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  platformsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: '#E1306C',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  platformBadgeYoutube: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: '#FF0000',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  platformText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  audienceContainer: {
    gap: SPACING.md,
  },
  audienceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.lg,
  },
  audienceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audienceContent: {
    flex: 1,
  },
  audienceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  audienceValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inviteButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  inviteButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
