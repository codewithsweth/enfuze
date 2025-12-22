import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, MessageCircle, Search as SearchIcon, SlidersHorizontal, Sparkles, Star, MapPin, TrendingUp, Target } from 'lucide-react-native';
import InfluencerCard from '@/components/influencer/InfluencerCard';
import TopInfluencerCard from '@/components/influencer/TopInfluencerCard';
import LocationCard from '@/components/search/LocationCard';
import CategoryCard from '@/components/search/CategoryCard';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

const FILTER_TABS = [
  { id: 'explore', name: 'Explore', icon: Sparkles },
  { id: 'top-creators', name: 'Top Creators', icon: Star },
  { id: 'nearby', name: 'Nearby', icon: MapPin },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'categories', name: 'Categories', icon: Target },
];

const CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'automobile', name: 'Automobile', icon: '🚗' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
];

export default function BrandSearchScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradient.brandSearch} style={styles.headerGradient}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
              <Bell color={COLORS.text} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/messages')}>
              <MessageCircle color={COLORS.text} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon color={COLORS.textTertiary} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search creators, categories..."
              placeholderTextColor={COLORS.textTertiary}
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
          contentContainerStyle={styles.filterTabs}
        >
          {FILTER_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterTab, isSelected && styles.filterTabActive]}
                onPress={() => setSelectedFilter(tab.id)}
              >
                <Icon color={COLORS.text} size={20} />
                <Text style={styles.filterTabText}>{tab.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
            <Text style={styles.sectionTitle}>Explore by Location</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <LocationCard
              city="Mumbai"
              image="https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg"
            />
            <LocationCard
              city="Delhi"
              image="https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg"
            />
            <LocationCard
              city="Bangalore"
              image="https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg"
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                name={category.name}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWithIcon}>
              <TrendingUp color={COLORS.warning} size={20} />
              <Text style={styles.sectionTitle}>Top Influencers</Text>
            </View>
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
    paddingBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
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
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    height: 52,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.md,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
  },
  filterTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterTabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
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
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.lg,
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
  seeMore: {
    fontSize: FONT_SIZES.md,
    color: COLORS.brand.green,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.xxl,
    gap: SPACING.md,
  },
});
