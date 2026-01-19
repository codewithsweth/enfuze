import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, MessageCircle, Wallet, Plus, TrendingUp } from 'lucide-react-native';
import InfluencerCard from '@/components/influencer/InfluencerCard';
import TopInfluencerCard from '@/components/influencer/TopInfluencerCard';
import CampaignCard from '@/components/campaign/CampaignCard';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

export default function BrandHomeScreen() {
  const router = useRouter();

  const handleCreateCampaign = () => {
    router.push('/campaign/select-template');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.gradient.brandHome}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ENFUZE</Text>
            <Text style={styles.greeting}>Hey Brand Name 👋</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
              <Bell color={COLORS.text} size={20} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/messages')}>
              <MessageCircle color={COLORS.text} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Wallet color={COLORS.text} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>67%</Text>
          </View>
          <View style={styles.profileContent}>
            <Text style={styles.profileTitle}>Complete Your Profile</Text>
            <Text style={styles.profileSubtitle}>You're 67% there! 🚀</Text>
          </View>
          <View style={styles.completeButton}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.campaignCard} onPress={handleCreateCampaign}>
          <View style={styles.campaignIcon}>
            <Plus color={COLORS.brand.green} size={28} />
          </View>
          <View style={styles.campaignContent}>
            <Text style={styles.campaignTitle}>Start New Campaign</Text>
            <Text style={styles.campaignSubtitle}>Launch in 3 minutes</Text>
          </View>
          <View style={styles.createButton}>
            <Text style={styles.createButtonText}>Create</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <InfluencerCard
              id="1"
              name="Sarah Wilson"
              category="Fashion"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              instagramFollowers="245K"
              youtubeFollowers="156K"
              facebookFollowers="89K"
            />
            <InfluencerCard
              id="2"
              name="Alex Chen"
              category="Tech"
              image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              instagramFollowers="189K"
              youtubeFollowers="234K"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWithIcon}>
              <TrendingUp color={COLORS.brand.green} size={20} />
              <Text style={styles.sectionTitle}>Top Influencers</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <TopInfluencerCard
              id="1"
              name="Emma Rodriguez"
              category="Beauty"
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
              rating={4.9}
              rank={1}
              instagramFollowers="690K"
              youtubeFollowers="567K"
              facebookFollowers="234K"
            />
            <TopInfluencerCard
              id="2"
              name="Ryan Thomp"
              category="Gaming"
              image="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
              rating={4.8}
              rank={2}
              instagramFollowers="1.2M"
              youtubeFollowers="2.1M"
              facebookFollowers="456K"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Campaigns</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.cardContainer}>
              <CampaignCard
                id="1"
                title="Summer Sneaker Drop"
                brandName="Zara India"
                budgetRange="₹50K - ₹1L"
                image="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                status="Ongoing"
                progress={67}
                category="Fashion"
                dateRange="Dec 15 - 24 Dec"
                location="Mumbai"
                targetAge="18-25"
                targetGender="Female"
                targetFollowers="10K-25K followers"
                applicants={236}
                platforms={['youtube', 'instagram']}
                onPress={() => router.push('/campaign/1')}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Similar Campaigns</Text>
            <TouchableOpacity>
              <Text style={styles.explore}>Explore</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.cardContainer}>
              <CampaignCard
                id="1"
                title="Sneaker Launch"
                brandName="Nike India"
                budgetRange="₹5K - ₹10K"
                image="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
                status="New"
                category="Fashion"
                dateRange="Dec 20 - 30 Dec"
                location="Delhi"
                targetAge="18-30"
                targetGender="Male"
                targetFollowers="5K-15K followers"
                applicants={145}
                platforms={['youtube', 'instagram']}
                onPress={() => router.push('/campaign/1')}
              />
            </View>
            <View style={styles.cardContainer}>
              <CampaignCard
                id="2"
                title="Skincare Promo"
                brandName="Nykaa"
                budgetRange="₹3K - ₹7K"
                image="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg"
                status="New"
                category="Beauty"
                dateRange="Dec 25 - 5 Jan"
                location="Bangalore"
                targetAge="30-50"
                targetGender="Female"
                targetFollowers="20K-50K followers"
                applicants={89}
                platforms={['instagram']}
                onPress={() => router.push('/campaign/2')}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xxl,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 1,
  },
  greeting: {
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  progressCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    opacity: 0.9,
  },
  completeButton: {
    backgroundColor: COLORS.text,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  completeButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.brand.green,
  },
  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xxl,
    gap: SPACING.md,
  },
  campaignIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  campaignContent: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  campaignSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    opacity: 0.9,
  },
  createButton: {
    backgroundColor: COLORS.text,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  createButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.brand.green,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xxl,
  },
  section: {
    marginTop: SPACING.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  seeAll: {
    fontSize: FONT_SIZES.md,
    color: COLORS.brand.green,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: FONT_SIZES.md,
    color: COLORS.brand.green,
    fontWeight: '600',
  },
  explore: {
    fontSize: FONT_SIZES.md,
    color: COLORS.brand.green,
    fontWeight: '600',
  },
  cardContainer: {
    width: 360,
    marginRight: SPACING.lg,
  },
});
