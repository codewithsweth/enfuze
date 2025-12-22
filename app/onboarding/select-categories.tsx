import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ArrowRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
}

const STATIC_CATEGORIES: Category[] = [
  { id: '1', name: 'Fashion', slug: 'fashion', emoji: '👕' },
  { id: '2', name: 'Beauty', slug: 'beauty', emoji: '✨' },
  { id: '3', name: 'Technology', slug: 'technology', emoji: '🤖' },
  { id: '4', name: 'Food', slug: 'food', emoji: '🍕' },
  { id: '5', name: 'Travel', slug: 'travel', emoji: '✈️' },
  { id: '6', name: 'Fitness', slug: 'fitness', emoji: '🏆' },
  { id: '7', name: 'Gaming', slug: 'gaming', emoji: '🎮' },
  { id: '8', name: 'Lifestyle', slug: 'lifestyle', emoji: '😎' },
  { id: '9', name: 'Finance', slug: 'finance', emoji: '📈' },
  { id: '10', name: 'Education', slug: 'education', emoji: '📚' },
  { id: '11', name: 'Health', slug: 'health', emoji: '❤️' },
  { id: '12', name: 'Entertainment', slug: 'entertainment', emoji: '🍿' },
  { id: '13', name: 'Sports', slug: 'sports', emoji: '⚽' },
  { id: '14', name: 'Automobile', slug: 'automobile', emoji: '🚗' },
];

export default function SelectCategoriesScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [categories] = useState<Category[]>(STATIC_CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleContinue = async () => {
    if (profile?.user_type === 'influencer') {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(tabs)/home');
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (categoryId: string) => selectedCategories.includes(categoryId);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Select Categories</Text>
        <Text style={styles.subtitle}>
          Choose categories that fit your {profile?.user_type === 'brand' ? 'brand' : 'content'}
        </Text>

        <View style={styles.searchContainer}>
          <Search color="#2DD4BF" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.categoriesGrid}>
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                isSelected(category.id) && styles.categoryChipSelected,
              ]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryText,
                  isSelected(category.id) && styles.categoryTextSelected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.missingContainer}>
          <Text style={styles.missingText}>
            Categories Missing?{' '}
            <Text style={styles.missingLink}>Let us know</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={['#2DD4BF', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Saving...' : 'Continue'}
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: '#1E2837',
  },
  categoryChipSelected: {
    backgroundColor: '#1E3A3A',
    borderColor: '#2DD4BF',
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  missingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  missingText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  missingLink: {
    color: '#2DD4BF',
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
