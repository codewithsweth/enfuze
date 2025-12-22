import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Sparkles,
  Heart,
  Car,
  Stethoscope,
  BookOpen,
  Wind,
  Shirt,
  Gamepad2,
  Bell,
  MessageCircle
} from 'lucide-react-native';

const categories = [
  { id: 1, name: 'Beauty', icon: Sparkles },
  { id: 2, name: 'Health', icon: Heart },
  { id: 3, name: 'Automobile', icon: Car },
  { id: 4, name: 'Doctor', icon: Stethoscope },
  { id: 5, name: 'Education', icon: BookOpen },
  { id: 6, name: 'Environment', icon: Wind },
  { id: 7, name: 'Fashion', icon: Shirt },
  { id: 8, name: 'Gaming', icon: Gamepad2 },
];

const recentConnections = [
  { id: 1, name: 'Nike', rating: '4.8', status: 'Recently worked', logo: '👟' },
  { id: 2, name: 'Adidas', rating: '4.7', status: 'Recently worked', logo: '⚡' },
];

const recommendations = [
  { id: 1, name: 'Nike', category: 'Fashion', match: '92%', budget: '50K+', logo: '👟' },
  { id: 2, name: 'Puma', category: 'Sportswear', match: '92%', budget: '40K+', logo: '🐆' },
  { id: 3, name: 'Adidas', category: 'Fashion', match: '85%', budget: '60K+', logo: '⚡' },
  { id: 4, name: 'Coca Cola', category: 'Beverage', match: '85%', budget: '35K+', logo: '🥤' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>ENFUZE</Text>
          <Text style={styles.greeting}>Hey Brand Name 👋</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.coinBadge}>
            <Text style={styles.coinText}>💰 1K</Text>
          </View>
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
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#14B8A6', '#0D9488']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileContent}>
              <View>
                <Text style={styles.profileTitle}>Complete Your Profile</Text>
                <Text style={styles.profileSubtitle}>You're 67% there 🚀</Text>
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>67%</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.campaignCard}>
          <LinearGradient
            colors={['#0F172A', '#1E293B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.campaignGradient}
          >
            <Text style={styles.campaignIcon}>➕</Text>
            <View style={styles.campaignContent}>
              <Text style={styles.campaignTitle}>Start New Campaign</Text>
              <Text style={styles.campaignSubtitle}>Launch in 3 minutes</Text>
            </View>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Icon color="#2DD4BF" size={24} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Connected</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentConnections.map((item) => (
            <View key={item.id} style={styles.connectionCard}>
              <View style={styles.connectionLogo}>
                <Text style={styles.connectionLogoText}>{item.logo}</Text>
              </View>
              <View style={styles.connectionInfo}>
                <Text style={styles.connectionName}>{item.name}</Text>
                <View style={styles.connectionDetails}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.connectionActions}>
                <TouchableOpacity style={styles.reconnectButton}>
                  <Text style={styles.reconnectText}>Reconnect</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyButton}>
                  <Text style={styles.historyText}>View History</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recommendationsGrid}>
            {recommendations.map((item) => (
              <View key={item.id} style={styles.recommendationCard}>
                <View style={styles.recommendationLogo}>
                  <Text style={styles.recommendationLogoText}>{item.logo}</Text>
                </View>
                <Text style={styles.recommendationName}>{item.name}</Text>
                <Text style={styles.recommendationCategory}>{item.category} • {item.match} Match</Text>
                <Text style={styles.recommendationBudget}>₹{item.budget}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>→</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0D7C66',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  coinText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
  content: {
    flex: 1,
    paddingTop: 24,
  },
  profileCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileGradient: {
    padding: 20,
  },
  profileContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  progressContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  completeButtonText: {
    color: '#14B8A6',
    fontSize: 16,
    fontWeight: '600',
  },
  campaignCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  campaignGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  campaignIcon: {
    fontSize: 32,
  },
  campaignContent: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  campaignSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
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
    color: '#2DD4BF',
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#0D9488',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(45, 212, 191, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  connectionLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionLogoText: {
    fontSize: 28,
  },
  connectionInfo: {
    flex: 1,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  connectionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FBBF24',
    fontWeight: '600',
  },
  dot: {
    color: '#6B7280',
  },
  status: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  connectionActions: {
    gap: 8,
  },
  reconnectButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  reconnectText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  historyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  recommendationCard: {
    width: '47%',
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  recommendationLogo: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  recommendationLogoText: {
    fontSize: 48,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recommendationCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  recommendationBudget: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 12,
  },
  viewDetailsButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2DD4BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
