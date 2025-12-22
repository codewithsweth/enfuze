import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, X, Lightbulb } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  borderColor: string;
}

const PLATFORMS: SocialPlatform[] = [
  {
    id: 'google',
    name: 'Google',
    icon: 'https://www.google.com/favicon.ico',
    color: '#2D3748',
    borderColor: '#4A5568',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico',
    color: '#831843',
    borderColor: '#BE185D',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://www.facebook.com/favicon.ico',
    color: '#1E3A8A',
    borderColor: '#2563EB',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'https://abs.twimg.com/favicons/twitter.ico',
    color: '#1E293B',
    borderColor: '#475569',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'https://www.youtube.com/favicon.ico',
    color: '#7F1D1D',
    borderColor: '#DC2626',
  },
];

export default function ConnectAccountScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [influencerProfileId, setInfluencerProfileId] = useState<string | null>(null);

  useEffect(() => {
    initializeInfluencerProfile();
  }, []);

  const initializeInfluencerProfile = async () => {
    if (!user) return;

    try {
      let { data: profile, error: profileError } = await supabase
        .from('influencer_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        const { data: newProfile, error: createError } = await supabase
          .from('influencer_profiles')
          .insert({ user_id: user.id })
          .select('id')
          .single();

        if (createError) throw createError;
        profile = newProfile;
      }

      setInfluencerProfileId(profile.id);
      await fetchConnections(profile.id);
    } catch (err: any) {
      console.error('Error initializing influencer profile:', err);
    }
  };

  const fetchConnections = async (influencerId: string) => {
    try {
      const { data, error } = await supabase
        .from('social_connections')
        .select('platform')
        .eq('influencer_id', influencerId)
        .eq('is_connected', true);

      if (error) throw error;
      setConnectedPlatforms(data.map((item) => item.platform));
    } catch (err: any) {
      console.error('Error fetching connections:', err);
    }
  };

  const handleConnect = async (platformId: string) => {
    if (!influencerProfileId) return;

    setLoading(true);

    try {
      if (connectedPlatforms.includes(platformId)) {
        const { error } = await supabase
          .from('social_connections')
          .delete()
          .eq('influencer_id', influencerProfileId)
          .eq('platform', platformId);

        if (error) throw error;
        setConnectedPlatforms(connectedPlatforms.filter((p) => p !== platformId));
      } else {
        const { error } = await supabase.from('social_connections').insert({
          influencer_id: influencerProfileId,
          platform: platformId,
          is_connected: true,
        });

        if (error) throw error;
        setConnectedPlatforms([...connectedPlatforms, platformId]);
      }
    } catch (err: any) {
      console.error('Error updating connection:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/onboarding/influencer/build-profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#E5E7EB" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Connect Your Account</Text>
        <Text style={styles.subtitle}>
          Add your social media accounts to showcase your content and connect with brands
        </Text>

        <View style={styles.platformList}>
          {PLATFORMS.map((platform) => {
            const isConnected = connectedPlatforms.includes(platform.id);

            return (
              <View
                key={platform.id}
                style={[
                  styles.platformCard,
                  { backgroundColor: platform.color, borderColor: platform.borderColor },
                ]}
              >
                <View style={styles.platformInfo}>
                  <View style={styles.platformIcon}>
                    <Image source={{ uri: platform.icon }} style={styles.iconImage} />
                  </View>
                  <Text style={styles.platformName}>{platform.name}</Text>
                </View>

                {isConnected ? (
                  <View style={styles.connectedRow}>
                    <View style={styles.connectedBadge}>
                      <Check color="#FFFFFF" size={16} />
                      <Text style={styles.connectedText}>Connected</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.disconnectButton}
                      onPress={() => handleConnect(platform.id)}
                      disabled={loading}
                    >
                      <X color="#FFFFFF" size={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.connectButton}
                    onPress={() => handleConnect(platform.id)}
                    disabled={loading}
                  >
                    <LinearGradient
                      colors={['#2DD4BF', '#14B8A6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.connectGradient}
                    >
                      <Text style={styles.connectText}>Connect</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.proTipCard}>
          <Lightbulb color="#FBBF24" size={24} />
          <Text style={styles.proTipText}>
            Pro Tip: Connect multiple platforms to increase your visibility and reach more brands!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#2DD4BF', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
    marginBottom: 32,
    lineHeight: 24,
  },
  platformList: {
    gap: 16,
    marginBottom: 24,
  },
  platformCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  platformIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  platformName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 212, 191, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  connectedText: {
    color: '#2DD4BF',
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  connectGradient: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  proTipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  proTipText: {
    flex: 1,
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
