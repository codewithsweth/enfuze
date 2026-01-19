import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, MessageCircle, Search, SlidersHorizontal, Coins } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import CampaignCard from '@/components/campaign/CampaignCard';

type CampaignStatus = 'New' | 'Ongoing' | 'On Hold' | 'Completed';

const filterTabs: CampaignStatus[] = ['New', 'Ongoing', 'On Hold', 'Completed'];

const mockCampaigns = [
  {
    id: '1',
    title: 'Summer Sneaker Drop',
    brandName: 'Zara India',
    budgetRange: '₹50K - ₹1L',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    status: 'Ongoing' as CampaignStatus,
    progress: 5,
    category: 'Fashion',
    dateRange: 'Dec 15 - 24 Dec',
    location: 'Mumbai',
    targetAge: '18-25',
    targetGender: 'Female',
    targetFollowers: '10K-25K followers',
    applicants: 236,
    platforms: ['youtube', 'instagram'] as ('youtube' | 'instagram')[],
  },
  {
    id: '2',
    title: 'Summer Sneaker Drop',
    brandName: 'Zara India',
    budgetRange: '₹50K - ₹1L',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    status: 'New' as CampaignStatus,
    category: 'Fashion',
    dateRange: 'Dec 15 - 24 Dec',
    location: 'Mumbai',
    targetAge: '18-25',
    targetGender: 'Female',
    targetFollowers: '10K-25K followers',
    applicants: 23,
    platforms: ['youtube', 'instagram'] as ('youtube' | 'instagram')[],
  },
  {
    id: '3',
    title: 'Summer Sneaker Drop',
    brandName: 'Zara India',
    budgetRange: '₹50K - ₹1L',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    status: 'New' as CampaignStatus,
    category: 'Fashion',
    dateRange: 'Dec 15 - 24 Dec',
    location: 'Mumbai',
    targetAge: '18-25',
    targetGender: 'Female',
    targetFollowers: '10K-25K followers',
    applicants: 23,
    platforms: ['youtube', 'instagram'] as ('youtube' | 'instagram')[],
  },
];

export default function CampaignsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<CampaignStatus>('New');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = mockCampaigns.filter(
    (campaign) => campaign.status === selectedFilter
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.title}>Campaigns</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/notifications')}
            >
              <Bell color={COLORS.text} size={20} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/messages')}
            >
              <MessageCircle color={COLORS.text} size={20} />
            </TouchableOpacity>
            <View style={styles.coinsButton}>
              <Coins color={COLORS.text} size={20} />
              <View style={styles.coinsBadge}>
                <Text style={styles.coinsBadgeText}>100k</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search creators, categories,..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal color={COLORS.text} size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
          contentContainerStyle={styles.filterTabsContent}
        >
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterTab, isSelected && styles.filterTabActive]}
                onPress={() => setSelectedFilter(tab)}
              >
                <Text style={[styles.filterTabText, isSelected && styles.filterTabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.campaignsList}>
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              brandName={campaign.brandName}
              budgetRange={campaign.budgetRange}
              image={campaign.image}
              status={campaign.status}
              progress={campaign.progress}
              category={campaign.category}
              dateRange={campaign.dateRange}
              location={campaign.location}
              targetAge={campaign.targetAge}
              targetGender={campaign.targetGender}
              targetFollowers={campaign.targetFollowers}
              applicants={campaign.applicants}
              platforms={campaign.platforms}
              onPress={() => {}}
              onBookmark={() => {}}
              onMenu={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/campaign/select-template')}>
        <LinearGradient
          colors={['#00D09E', '#00A67E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fabGradient}
        >
          <Text style={styles.fabIcon}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.xxl,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
  },
  headerTop: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerIcons: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.brand.green,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  coinsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coinsBadge: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  coinsBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  searchSection: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    marginHorizontal: -SPACING.xxl,
  },
  filterTabsContent: {
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.md,
  },
  filterTab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterTabActive: {
    backgroundColor: COLORS.text,
  },
  filterTabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  filterTabTextActive: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  campaignsList: {
    padding: SPACING.lg,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: COLORS.text,
  },
});
