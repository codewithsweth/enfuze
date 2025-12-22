import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>
            <Text style={styles.logoE}>E</Text>
            <Text style={styles.logoN}>N</Text>
            <Text style={styles.logoF}>F</Text>
            <Text style={styles.logoU}>U</Text>
            <Text style={styles.logoZ}>Z</Text>
            <Text style={styles.logoE2}>E</Text>
          </Text>

          <Text style={styles.title}>Welcome to ENFUZE!</Text>
          <Text style={styles.subtitle}>
            You're all set as a {profile?.user_type === 'brand' ? 'Brand' : 'Influencer'}
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Onboarding Complete</Text>
            <Text style={styles.cardText}>
              Your profile has been successfully created. You can now start{' '}
              {profile?.user_type === 'brand'
                ? 'connecting with influencers and launching campaigns'
                : 'collaborating with brands and monetizing your content'}
              .
            </Text>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 32,
  },
  logoE: {
    color: '#FF6B35',
  },
  logoN: {
    color: '#4ADE80',
  },
  logoF: {
    color: '#EC4899',
  },
  logoU: {
    color: '#FBBF24',
  },
  logoZ: {
    color: '#3B82F6',
  },
  logoE2: {
    color: '#FF6B35',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#1E3A3A',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#2DD4BF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2DD4BF',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  signOutButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  signOutText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '600',
  },
});
