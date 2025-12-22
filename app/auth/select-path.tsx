import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Megaphone, Users } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SelectPathScreen() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [selectedPath, setSelectedPath] = useState<'brand' | 'influencer' | null>(null);

  const handleSelectPath = async (userType: 'brand' | 'influencer') => {
    setSelectedPath(userType);

    if (userType === 'brand') {
      router.replace('/onboarding/brand/add-team');
    } else {
      router.replace('/onboarding/influencer/connect-account');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroCard}>
        <LinearGradient
          colors={['#3B2F2F', '#2D2045']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Influencer marketing,{'\n'}
              <Text style={styles.heroTitleAccent}>simplified & secure</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Connect with verified influencers, manage{'\n'}collaborations & grow.
            </Text>

            <View style={styles.iconGrid}>
              <View style={styles.iconCard}>
                <LinearGradient
                  colors={['#2DD4BF', '#14B8A6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Text style={styles.iconText}>📈</Text>
                </LinearGradient>
              </View>
              <View style={styles.iconCard}>
                <LinearGradient
                  colors={['#EC4899', '#BE185D']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Text style={styles.iconText}>❤️</Text>
                </LinearGradient>
              </View>
              <View style={styles.iconCard}>
                <LinearGradient
                  colors={['#3B82F6', '#1D4ED8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Text style={styles.iconText}>📊</Text>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.illustration}>
              <Text style={styles.illustrationEmoji}>👨‍💼</Text>
              <View style={styles.dollarBadge}>
                <Text style={styles.dollarText}>$</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <TouchableOpacity
        style={styles.pathCard}
        onPress={() => handleSelectPath('brand')}
      >
        {selectedPath === 'brand' ? (
          <LinearGradient
            colors={['#14B8A6', '#0D9488']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pathGradient}
          >
            <View style={styles.pathIconContainer}>
              <Megaphone color="#FFFFFF" size={32} />
            </View>
            <View style={styles.pathContent}>
              <Text style={styles.pathTitle}>Brand</Text>
              <Text style={styles.pathDescription}>
                Launch powerful campaigns and connect with the right creators.
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.pathCardInner}>
            <View style={styles.pathIconContainer}>
              <Megaphone color="#FFFFFF" size={32} />
            </View>
            <View style={styles.pathContent}>
              <Text style={styles.pathTitle}>Brand</Text>
              <Text style={styles.pathDescription}>
                Launch powerful campaigns and connect with the right creators.
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pathCard}
        onPress={() => handleSelectPath('influencer')}
      >
        {selectedPath === 'influencer' ? (
          <LinearGradient
            colors={['#14B8A6', '#0D9488']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pathGradient}
          >
            <View style={styles.pathIconContainer}>
              <Users color="#FFFFFF" size={32} />
            </View>
            <View style={styles.pathContent}>
              <Text style={styles.pathTitle}>Influencer</Text>
              <Text style={styles.pathDescription}>
                Collaborate with top brands and turn content into income.
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.pathCardInner}>
            <View style={styles.pathIconContainer}>
              <Users color="#FFFFFF" size={32} />
            </View>
            <View style={styles.pathContent}>
              <Text style={styles.pathTitle}>Influencer</Text>
              <Text style={styles.pathDescription}>
                Collaborate with top brands and turn content into income.
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroGradient: {
    padding: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 36,
  },
  heroTitleAccent: {
    color: '#2DD4BF',
  },
  heroDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 24,
    lineHeight: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  iconCard: {
    width: 64,
    height: 64,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 32,
  },
  illustration: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 8,
  },
  illustrationEmoji: {
    fontSize: 120,
  },
  dollarBadge: {
    position: 'absolute',
    right: -10,
    top: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  dollarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pathCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  pathGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  pathCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
    backgroundColor: '#1A2332',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2DD4BF',
  },
  pathIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathContent: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pathDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
});
