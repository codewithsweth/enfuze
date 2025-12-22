import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, MoreVertical, Star } from 'lucide-react-native';

const filterTabs = [
  { id: 1, name: 'All', count: 6 },
  { id: 2, name: 'Unread', count: 2 },
  { id: 3, name: 'Read', count: 4 },
  { id: 4, name: 'Favorites', count: 3, icon: Star },
];

const conversations = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: '👩',
    message: 'Sounds great! When can we start',
    time: '2m ago',
    unreadCount: 2,
    verified: true,
    online: true,
    favorite: true,
  },
  {
    id: 2,
    name: 'Nike Brand',
    avatar: '👟',
    message: "We loved your proposal! Let's disc",
    time: '15m ago',
    unreadCount: 1,
    verified: true,
    online: true,
    favorite: true,
  },
  {
    id: 3,
    name: 'Alex Chen',
    avatar: '👨',
    message: 'Thanks for the collaboration!',
    time: '1h ago',
    unreadCount: 0,
    verified: true,
    online: false,
    favorite: false,
  },
  {
    id: 4,
    name: 'Adidas Team',
    avatar: '⚡',
    message: 'Campaign deadline is next week',
    time: '3h ago',
    unreadCount: 0,
    verified: true,
    online: false,
    favorite: true,
  },
  {
    id: 5,
    name: 'Maya Patel',
    avatar: '👩‍💼',
    message: 'Perfect! See you tomorrow',
    time: '1d ago',
    unreadCount: 0,
    verified: true,
    online: false,
    favorite: false,
  },
  {
    id: 6,
    name: 'Zara Fashion',
    avatar: '👗',
    message: 'Payment has been processed',
    time: '2d ago',
    unreadCount: 0,
    verified: true,
    online: false,
    favorite: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 2) return matchesSearch && conv.unreadCount > 0;
    if (selectedFilter === 3) return matchesSearch && conv.unreadCount === 0;
    if (selectedFilter === 4) return matchesSearch && conv.favorite;
    return matchesSearch;
  });

  const unreadCount = conversations.filter(c => c.unreadCount > 0).length;

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
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>{unreadCount} unread</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MoreVertical color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#6B7280" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search creators, categories, loc..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
        contentContainerStyle={styles.filterTabsContent}
      >
        {filterTabs.map((tab) => {
          const isSelected = selectedFilter === tab.id;
          const Icon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.filterTab, isSelected && styles.filterTabActive]}
              onPress={() => setSelectedFilter(tab.id)}
            >
              {Icon && <Icon color={isSelected ? '#FFFFFF' : '#9CA3AF'} size={16} />}
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

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationCard}
            onPress={() => router.push({
              pathname: '/chat',
              params: {
                id: conversation.id.toString(),
                name: conversation.name,
                avatar: conversation.avatar,
                verified: conversation.verified.toString(),
                online: conversation.online.toString(),
              }
            })}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{conversation.avatar}</Text>
              </View>
              {conversation.online && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <View style={styles.nameRow}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  {conversation.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.conversationTime}>{conversation.time}</Text>
              </View>
              <View style={styles.messageRow}>
                <Text
                  style={[
                    styles.conversationMessage,
                    conversation.unreadCount > 0 && styles.conversationMessageUnread
                  ]}
                  numberOfLines={1}
                >
                  {conversation.message}
                </Text>
                {conversation.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
            {conversation.favorite && (
              <View style={styles.favoriteIcon}>
                <Text style={styles.favoriteText}>📌</Text>
              </View>
            )}
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#14433C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2F2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterTabs: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  filterTabsContent: {
    gap: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  countTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2F2A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 191, 0.1)',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#1A2F2A',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conversationMessage: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
  },
  conversationMessageUnread: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#14B8A6',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  favoriteText: {
    fontSize: 16,
  },
});
