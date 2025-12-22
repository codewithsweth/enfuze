import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Filter, Settings, Check } from 'lucide-react-native';

const filterTabs = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Unread', count: 3 },
];

const notifications = [
  {
    id: 1,
    type: 'campaign',
    title: 'New Campaign Match!',
    description: 'You have a new campaign opportunity from Adidas for ₹50,000',
    time: '5 min ago',
    icon: '🎯',
    iconBg: '#F97316',
    unread: true,
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment of ₹25,000 has been credited to your wallet',
    time: '2 hours ago',
    icon: '💵',
    iconBg: '#10B981',
    unread: true,
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Milestone Achieved! 🎉',
    description: "Congratulations! You've completed 50 campaigns",
    time: '5 hours ago',
    icon: '🏆',
    iconBg: '#F59E0B',
    unread: true,
  },
  {
    id: 4,
    type: 'message',
    title: 'New Message from Nike',
    description: 'We have some questions about your campaign proposal',
    time: '1 day ago',
    icon: '💬',
    iconBg: '#3B82F6',
    unread: false,
  },
  {
    id: 5,
    type: 'approval',
    title: 'Campaign Approved',
    description: 'Your campaign "Summer Collection 2024" has been approved',
    time: '2 days ago',
    icon: '✓',
    iconBg: '#10B981',
    unread: false,
  },
  {
    id: 6,
    type: 'profile',
    title: 'Profile Update',
    description: 'Your profile has been successfully verified',
    time: '3 days ago',
    icon: '🔔',
    iconBg: '#8B5CF6',
    unread: false,
  },
  {
    id: 7,
    type: 'withdrawal',
    title: 'Withdrawal Successful',
    description: '₹15,000 has been transferred to your bank account',
    time: '4 days ago',
    icon: '💸',
    iconBg: '#10B981',
    unread: false,
  },
  {
    id: 8,
    type: 'deadline',
    title: 'Campaign Deadline',
    description: 'Your campaign deliverable is due in 2 days',
    time: '5 days ago',
    icon: '⏰',
    iconBg: '#EF4444',
    unread: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(1);

  const filteredNotifications = selectedFilter === 2
    ? notifications.filter(n => n.unread)
    : notifications;

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>{unreadCount} unread</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Filter color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Settings color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
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
              {tab.count !== undefined && (
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{tab.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
        <View style={styles.filterSpacer} />
        <TouchableOpacity style={styles.markAllButton}>
          <Check color="#2DD4BF" size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredNotifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <View style={[styles.notificationIcon, { backgroundColor: notification.iconBg }]}>
              <Text style={styles.notificationIconText}>{notification.icon}</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            {notification.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F1C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0A1F1C',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#14433C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#14433C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterTabActive: {
    backgroundColor: '#14B8A6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  countBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterSpacer: {
    flex: 1,
  },
  markAllButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45, 212, 191, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1A2F2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.1)',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconText: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
});
