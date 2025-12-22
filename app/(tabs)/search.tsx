import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, MessageCircle, Search as SearchIcon, SlidersHorizontal, Sparkles, Star, MapPin, TrendingUp, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const filterTabs = [
  { id: 1, name: 'Explore', icon: Sparkles },
  { id: 2, name: 'Top Creators', icon: Star },
  { id: 3, name: 'Nearby', icon: MapPin },
  { id: 4, name: 'Trending', icon: TrendingUp },
  { id: 5, name: 'Categories', icon: Target },
];

const featuredInfluencers = [
  { id: 1, name: 'Nike', category: 'Sportswear', followers: '2.1M', engagement: '12%', rating: '4.8', verified: true },
  { id: 2, name: 'Coca Cola', category: 'Beverage', followers: '162K', engagement: '15%', rating: '4.9', verified: true },
  { id: 3, name: 'Adidas', category: 'Sportswear', followers: '94K', engagement: '8.4%', rating: '4.7', verified: true },
];

const locations = [
  { id: 1, name: 'Mumbai', image: '🏛️' },
  { id: 2, name: 'Delhi', image: '🕌' },
  { id: 3, name: 'Bangalore', image: '🌆' },
];

const categories = [
  { id: 1, name: 'Fashion', emoji: '👕', color: '#14B8A6' },
  { id: 2, name: 'Beauty', emoji: '💄', color: '#EC4899' },
  { id: 3, name: 'Fitness', emoji: '🏋️', color: '#F59E0B' },
  { id: 4, name: 'Education', emoji: '📚', color: '#8B5CF6' },
  { id: 5, name: 'Entertainment', emoji: '🎬', color: '#6366F1' },
  { id: 6, name: 'Gaming', emoji: '🎮', color: '#10B981' },
  { id: 7, name: 'Automobile', emoji: '🚗', color: '#EF4444' },
  { id: 8, name: 'Lifestyle', emoji: '✨', color: '#F59E0B' },
];

const topInfluencers = [
  { id: 1, name: 'Adidas', category: 'Sportswear', rating: '4.7', followers: '234K', engagement: '6.9%', badge: 'TOP' },
  { id: 2, name: 'Puma', category: 'Sportswear', rating: '4.6', followers: '198K', engagement: '5.8%', badge: 'TOP' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Search</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/notifications')}
          >
            <Bell color="#FFFFFF" size={20} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/messages')}
          >
            <MessageCircle color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <SearchIcon color="#6B7280" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search creators, categories..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
          contentContainerStyle={styles.filterTabsContent}
        >
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterTab, isSelected && styles.filterTabActive]}
                onPress={() => setSelectedFilter(tab.id)}
              >
                <Icon color={isSelected ? '#3B82F6' : '#FFFFFF'} size={20} />
                <Text style={[styles.filterTabText, isSelected && styles.filterTabTextActive]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Influencers</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {featuredInfluencers.map((influencer) => (
            <View key={influencer.id} style={styles.influencerCard}>
              <View style={styles.influencerBadge}>
                <Text style={styles.topBadgeText}>TOP</Text>
              </View>
              <View style={styles.influencerLogo}>
                <Text style={styles.influencerLogoText}>
                  {influencer.name === 'Nike' ? '👟' : influencer.name === 'Coca Cola' ? '🥤' : '⚡'}
                </Text>
                {influencer.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.influencerInfo}>
                <Text style={styles.influencerName}>{influencer.name}</Text>
                <Text style={styles.influencerCategory}>{influencer.category}</Text>
                <View style={styles.influencerStats}>
                  <View style={styles.stat}>
                    <Text style={styles.statIcon}>👥</Text>
                    <Text style={styles.statText}>{influencer.followers} followers</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statIcon}>📈</Text>
                    <Text style={styles.statText}>{influencer.engagement} rate</Text>
                  </View>
                </View>
              </View>
              <View style={styles.influencerRating}>
                <Text style={styles.ratingText}>⭐ {influencer.rating}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore by Location</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>See More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.locationsContainer}
          >
            {locations.map((location) => (
              <TouchableOpacity key={location.id} style={styles.locationCard}>
                <Text style={styles.locationImage}>{location.image}</Text>
                <View style={styles.locationOverlay}>
                  <Text style={styles.locationName}>{location.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚡ Top Influencers</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topInfluencersContainer}
          >
            {topInfluencers.map((influencer) => (
              <View key={influencer.id} style={styles.topInfluencerCard}>
                <View style={styles.topBadge}>
                  <Text style={styles.topBadgeText}>TOP</Text>
                </View>
                <View style={styles.topInfluencerLogo}>
                  <Text style={styles.topInfluencerLogoText}>
                    {influencer.name === 'Adidas' ? '⚡' : '🐆'}
                  </Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                </View>
                <Text style={styles.topInfluencerName}>{influencer.name}</Text>
                <Text style={styles.topInfluencerCategory}>{influencer.category}</Text>
                <View style={styles.topInfluencerStats}>
                  <View style={styles.topStat}>
                    <Text style={styles.topStatLabel}>⭐ {influencer.rating}</Text>
                  </View>
                  <View style={styles.topStat}>
                    <Text style={styles.topStatLabel}>📊 {influencer.followers}</Text>
                  </View>
                </View>
                <View style={styles.topInfluencerFooter}>
                  <View style={styles.engagementBadge}>
                    <Text style={styles.engagementText}>❤️ {influencer.engagement}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  headerIcons: {
    position: 'absolute',
    top: 60,
    right: 24,
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    marginHorizontal: -24,
  },
  filterTabsContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterTabTextActive: {
    color: '#3B82F6',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAll: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  influencerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    position: 'relative',
  },
  influencerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  topBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  influencerLogo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 16,
  },
  influencerLogoText: {
    fontSize: 36,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E2837',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  influencerInfo: {
    flex: 1,
  },
  influencerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  influencerCategory: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  influencerStats: {
    gap: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  influencerRating: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  locationsContainer: {
    gap: 16,
  },
  locationCard: {
    width: 140,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E2837',
  },
  locationImage: {
    fontSize: 80,
    textAlign: 'center',
    marginTop: 10,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  categoryCard: {
    width: '22%',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  topInfluencersContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  topInfluencerCard: {
    width: 160,
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  topBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  topInfluencerLogo: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  topInfluencerLogoText: {
    fontSize: 48,
  },
  topInfluencerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topInfluencerCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  topInfluencerStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  topStat: {
    backgroundColor: '#0F172A',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  topStatLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  topInfluencerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagementBadge: {
    backgroundColor: '#DC2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  engagementText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
