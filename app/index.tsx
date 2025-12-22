import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Mail } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageGrid}>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg' }}
              style={styles.gridImage}
            />
          </View>
        </View>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/949131/pexels-photo-949131.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' }}
              style={styles.gridImage}
            />
          </View>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          <Text style={styles.logoE}>E</Text>
          <Text style={styles.logoN}>N</Text>
          <Text style={styles.logoF}>F</Text>
          <Text style={styles.logoU}>U</Text>
          <Text style={styles.logoZ}>Z</Text>
          <Text style={styles.logoE2}>E</Text>
        </Text>
      </View>

      <Text style={styles.tagline}>
        Connect Brands with Influencers and Influencers{'\n'}Connect with Brands
      </Text>

      <Text style={styles.loginPrompt}>Log in or sign up</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/auth/login-phone')}
      >
        <LinearGradient
          colors={['#2DD4BF', '#14B8A6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Phone color="#FFFFFF" size={24} />
          <Text style={styles.primaryButtonText}>Continue with Phone</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/auth/login-email')}
      >
        <Mail color="#E5E7EB" size={24} />
        <Text style={styles.secondaryButtonText}>Continue with Email</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{ uri: 'https://www.google.com/favicon.ico' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to our{' '}
        <Text style={styles.termsLink}>Terms of Service</Text> &{' '}
        <Text style={styles.termsLink}>Privacy policy</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageGrid: {
    marginBottom: 40,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
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
  tagline: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginPrompt: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  primaryButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  secondaryButtonText: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },
  dividerText: {
    color: '#9CA3AF',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#2DD4BF',
  },
});
