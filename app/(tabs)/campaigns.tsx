import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, MessageCircle, Search, SlidersHorizontal, MapPin, Calendar, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const filterTabs = [
  { id: 1, name: 'New', count: '24' },
  { id: 2, name: 'Applied', count: '2' },
  { id: 3, name: 'Completed', count: '1' },
  { id: 4, name: 'Ongoing', count: '3' },
];

const campaigns = [
  {
    id: 1,
    title: 'Summer Fashion Collection Launch',
    brand: 'Zara India',
    category: 'Fashion',
    budget: '50K - 1L',
    ageRange: '18-25, Female',
    location: 'Mumbai',
    deadline: 'Dec 15',
    matchRate: '95%',
    applicants: 145,
    verified: true,
    bgColor: '#FFC0CB',
  },
  {
    id: 2,
    title: 'Tech Product Review Campaign',
    brand: 'Samsung',
    category: 'Technology',
    budget: '1L - 2L',
    ageRange: '20-35, All',
    location: 'Pan India',
    deadline: 'Dec 20',
    matchRate: '92%',
    applicants: 234,
    verified: true,
    bgColor: '#B8D4E8',
  },
  {
    id: 3,
    title: 'Fitness & Wellness',
    brand: 'Nike India',
    category: 'Fitness',
    budget: '75K - 1.5L',
    ageRange: '22-30, All',
    location: 'Delhi NCR',
    deadline: 'Dec 18',
    matchRate: '92%',
    applicants: 178,
    verified: true,
    bgColor: '#C8E6C9',
  },
  {
    id: 4,
    title: 'Beauty & Skincare',
    brand: 'Nykaa',
    category: 'Beauty',
    budget: '60K - 1.2L',
    ageRange: '20-35, Female',
    location: 'Mumbai',
    deadline: 'Dec 25',
    matchRate: '90%',
    applicants: 267,
    verified: true,
    bgColor: '#FFE4E1',
  },
];

export default function CampaignsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Campaigns</Text>
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
            <Search color="#6B7280" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search creators, categories, locati..."
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
            const isSelected = selectedFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterTab, isSelected && styles.filterTabActive]}
                onPress={() => setSelectedFilter(tab.id)}
              >
                <Text style={[styles.filterTabText, isSelected && styles.filterTabTextActive]}>
                  {tab.name}
                </Text>
                <View style={[styles.countBadge, isSelected && styles.countBadgeActive]}>
                  <Text style={[styles.countText, isSelected && styles.countTextActive]}>
                    {tab.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {campaigns.map((campaign) => (
          <View key={campaign.id} style={styles.campaignCard}>
            <View style={[styles.campaignImage, { backgroundColor: campaign.bgColor }]}>
              <Text style={styles.campaignImagePlaceholder}>📸</Text>
            </View>

            <View style={styles.campaignContent}>
              <View style={styles.campaignHeader}>
                <View style={styles.campaignTitleRow}>
                  <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  <TouchableOpacity style={styles.bookmarkButton}>
                    <Text style={styles.bookmarkIcon}>🔖</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.brandRow}>
                  <Text style={styles.brandName}>{campaign.brand}</Text>
                  {campaign.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.category}>{campaign.category}</Text>
                </View>
              </View>

              <View style={styles.campaignDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.budgetBadge}>
                    <Text style={styles.budgetText}>₹ {campaign.budget}</Text>
                  </View>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>👤 {campaign.ageRange}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.detail}>
                    <MapPin color="#9CA3AF" size={14} />
                    <Text style={styles.detailText}>{campaign.location}</Text>
                  </View>
                  <View style={styles.detail}>
                    <Calendar color="#9CA3AF" size={14} />
                    <Text style={styles.detailText}>{campaign.deadline}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.campaignFooter}>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>⚡ {campaign.matchRate}</Text>
                </View>
                <View style={styles.applicantsInfo}>
                  <Users color="#9CA3AF" size={16} />
                  <Text style={styles.applicantsText}>{campaign.applicants} applicants</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                    <Text style={styles.applyArrow}>→</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsArrow}>→</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
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
    backgroundColor: '#7C3AED',
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
    color: '#7C3AED',
  },
  countBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  countBadgeActive: {
    backgroundColor: '#7C3AED',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  countTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  campaignCard: {
    flexDirection: 'row',
    backgroundColor: '#1E2837',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  campaignImage: {
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  campaignImagePlaceholder: {
    fontSize: 64,
  },
  campaignContent: {
    flex: 1,
    padding: 16,
  },
  campaignHeader: {
    marginBottom: 12,
  },
  campaignTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  campaignTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  bookmarkButton: {
    marginLeft: 8,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dot: {
    color: '#6B7280',
    fontSize: 12,
  },
  category: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  campaignDetails: {
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  budgetBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  budgetText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ageBadge: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  ageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  campaignFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  matchBadge: {
    backgroundColor: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  matchText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  applicantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  applicantsText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  applyArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
