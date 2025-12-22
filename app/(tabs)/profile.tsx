import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Camera, Settings, Share2, TrendingUp, Star, MapPin, Mail, Phone, Globe, LogOut, Target, Bookmark, Users, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  { id: 1, name: 'Fashion', color: '#F97316' },
  { id: 2, name: 'Lifestyle', color: '#3B82F6' },
  { id: 3, name: 'Beauty', color: '#10B981' },
];

const socialMedia = [
  { id: 1, name: 'Instagram', connected: true },
  { id: 2, name: 'Facebook', connected: true },
  { id: 3, name: 'YouTube', connected: true },
  { id: 4, name: 'Add', connected: false },
];

const quickLinks = [
  { id: 1, name: 'My Campaigns', count: '12', icon: Target, color: '#F97316' },
  { id: 2, name: 'Saved Items', count: '28', icon: Bookmark, color: '#EC4899' },
  { id: 3, name: 'Team Members', count: '5', icon: Users, color: '#3B82F6' },
  { id: 4, name: 'Activity History', icon: Clock, color: '#10B981' },
];

export default function ProfileScreen() {
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
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Camera color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩‍💼</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>

          <Text style={styles.profileName}>Priya Sharma</Text>
          <Text style={styles.profileRole}>Brand Manager @ Nike</Text>

          <View style={styles.badges}>
            <View style={styles.verifiedChip}>
              <Text style={styles.verifiedChipText}>✓ Verified</Text>
            </View>
            <View style={styles.locationChip}>
              <MapPin color="#FFFFFF" size={12} />
              <Text style={styles.locationChipText}>Mumbai</Text>
            </View>
            <View style={styles.joinedChip}>
              <Text style={styles.joinedChipText}>📅 Joined 2025</Text>
            </View>
          </View>

          <View style={styles.rating}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>4.0</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>245K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>8.5%</Text>
              <Text style={styles.statLabel}>Engagement</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 color="#FFFFFF" size={18} />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.analyticsButton}>
              <TrendingUp color="#FFFFFF" size={18} />
              <Text style={styles.analyticsButtonText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutTitle}>Fashion & Lifestyle</Text>
            </View>
            <View style={styles.categoryTags}>
              {categories.map((category) => (
                <View key={category.id} style={[styles.categoryTag, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryTagText}>{category.name}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.aboutDescription}>
              Passionate content creator specializing in fashion, lifestyle, and beauty. I love collaborating with brands that align with my values and create authentic content that resonates with my audience.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <Mail color="#3B82F6" size={20} />
            <Text style={styles.contactText}>john.carter@nike.com</Text>
            <TouchableOpacity>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactCard}>
            <Phone color="#10B981" size={20} />
            <Text style={styles.contactText}>+91 98765 43210</Text>
            <TouchableOpacity>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactCard}>
            <Globe color="#8B5CF6" size={20} />
            <Text style={styles.contactText}>www.nike.com</Text>
            <TouchableOpacity>
              <Text style={styles.linkIcon}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.socialMediaGrid}>
            {socialMedia.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={[
                  styles.socialMediaCard,
                  social.name === 'Instagram' && { backgroundColor: '#EC4899' },
                  social.name === 'Facebook' && { backgroundColor: '#3B82F6' },
                  social.name === 'YouTube' && { backgroundColor: '#EF4444' },
                  social.name === 'Add' && { backgroundColor: '#374151' },
                ]}
              >
                <Text style={styles.socialMediaIcon}>
                  {social.name === 'Instagram' ? '📷' : social.name === 'Facebook' ? '👍' : social.name === 'YouTube' ? '▶️' : '➕'}
                </Text>
                <Text style={styles.socialMediaName}>{social.name}</Text>
                {social.connected && <View style={styles.connectedDot} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <TouchableOpacity key={link.id} style={styles.quickLinkCard}>
                <View style={[styles.quickLinkIcon, { backgroundColor: link.color }]}>
                  <Icon color="#FFFFFF" size={24} />
                </View>
                <View style={styles.quickLinkContent}>
                  <Text style={styles.quickLinkName}>{link.name}</Text>
                  {link.count && (
                    <Text style={styles.quickLinkDescription}>View all your {link.name.toLowerCase()}</Text>
                  )}
                  {!link.count && (
                    <Text style={styles.quickLinkDescription}>Recent actions & updates</Text>
                  )}
                </View>
                {link.count && (
                  <View style={styles.quickLinkBadge}>
                    <Text style={styles.quickLinkBadgeText}>{link.count}</Text>
                  </View>
                )}
                <Text style={styles.quickLinkArrow}>→</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#2563EB', '#1E40AF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoutGradient}
          >
            <LogOut color="#FFFFFF" size={20} />
            <Text style={styles.logoutText}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    backgroundColor: '#000000',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E2837',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000000',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  onlineDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#000000',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  verifiedChip: {
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  verifiedChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E2837',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  locationChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  joinedChip: {
    backgroundColor: '#1E2837',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  joinedChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  ratingStars: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E2837',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E2837',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  analyticsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  aboutCard: {
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 20,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  categoryTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  aboutDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  copyIcon: {
    fontSize: 20,
  },
  linkIcon: {
    fontSize: 20,
  },
  socialMediaGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  socialMediaCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  socialMediaIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  socialMediaName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  connectedDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  quickLinkIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickLinkDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quickLinkBadge: {
    backgroundColor: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  quickLinkBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickLinkArrow: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  logoutButton: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
