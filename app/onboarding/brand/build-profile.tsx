import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Upload } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function BuildBrandProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    router.push('/onboarding/select-categories');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Build Your{'\n'}Brand Profile</Text>
        <Text style={styles.subtitle}>Just a few quick details to get started</Text>

        <View style={styles.logoSection}>
          <View style={styles.logoHeader}>
            <View style={styles.uploadIconContainer}>
              <Upload color="#2DD4BF" size={24} />
            </View>
            <View>
              <Text style={styles.logoTitle}>Brand Logo</Text>
              <Text style={styles.logoSubtitle}>Upload your brand identity</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.uploadArea}>
            <Upload color="#2DD4BF" size={32} />
            <Text style={styles.uploadText}>PNG, JPG up to 10MB</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.label}>Brand Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your brand name"
          placeholderTextColor="#6B7280"
          value={brandName}
          onChangeText={setBrandName}
        />

        <Text style={styles.label}>Tagline</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your tagline"
          placeholderTextColor="#6B7280"
          value={tagline}
          onChangeText={setTagline}
        />

        <Text style={styles.label}>Industry</Text>
        <View style={styles.selectContainer}>
          <TextInput
            style={styles.selectInput}
            placeholder="Select your industry"
            placeholderTextColor="#6B7280"
            value={industry}
            onChangeText={setIndustry}
          />
        </View>

        <Text style={styles.label}>
          Website <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="https://yourbrand.com"
          placeholderTextColor="#6B7280"
          value={website}
          onChangeText={setWebsite}
          keyboardType="url"
          autoCapitalize="none"
        />

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>,{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text> &{' '}
          <Text style={styles.termsLink}>Content Policy</Text>
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={loading}
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
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 32,
  },
  logoSection: {
    backgroundColor: '#1A2332',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2DD4BF',
    padding: 20,
    marginBottom: 24,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  uploadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  uploadArea: {
    backgroundColor: '#1E2837',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2DD4BF',
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optional: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#1E2837',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  selectContainer: {
    marginBottom: 20,
  },
  selectInput: {
    backgroundColor: '#1E2837',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 8,
  },
  termsLink: {
    color: '#2DD4BF',
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
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
