import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { UserPlus, ArrowRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

interface TeamMember {
  id: string;
  email: string;
  role: string;
  status: string;
}

export default function AddTeamMembersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brandProfileId, setBrandProfileId] = useState<string | null>(null);

  useEffect(() => {
    initializeBrandProfile();
  }, []);

  const initializeBrandProfile = async () => {
    if (!user) return;

    try {
      let { data: profile, error: profileError } = await supabase
        .from('brand_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        const { data: newProfile, error: createError } = await supabase
          .from('brand_profiles')
          .insert({ user_id: user.id })
          .select('id')
          .single();

        if (createError) throw createError;
        profile = newProfile;
      }

      setBrandProfileId(profile.id);
      await fetchTeamMembers(profile.id);
    } catch (err: any) {
      console.error('Error initializing brand profile:', err);
      setError(err.message);
    }
  };

  const fetchTeamMembers = async (brandId: string) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('brand_id', brandId)
        .order('invited_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err: any) {
      console.error('Error fetching team members:', err);
    }
  };

  const handleAddMember = async () => {
    if (!email || !brandProfileId) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('team_members').insert({
        brand_id: brandProfileId,
        email,
        role,
        status: 'pending',
      });

      if (insertError) throw insertError;

      await fetchTeamMembers(brandProfileId);
      setShowModal(false);
      setEmail('');
      setRole('member');
    } catch (err: any) {
      setError(err.message || 'Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/onboarding/brand/build-profile');
  };

  const handleSkip = () => {
    router.push('/onboarding/brand/build-profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Add Team Members</Text>
        <Text style={styles.subtitle}>Invite your team to collaborate</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <LinearGradient
            colors={['#2DD4BF', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <UserPlus color="#FFFFFF" size={24} />
            <Text style={styles.addButtonText}>Add Team Member</Text>
          </LinearGradient>
        </TouchableOpacity>

        {teamMembers.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <UserPlus color="#2DD4BF" size={64} />
            </View>
            <Text style={styles.emptyTitle}>No team members yet</Text>
            <Text style={styles.emptyDescription}>
              Add team members to collaborate on campaigns
            </Text>
          </View>
        ) : (
          <View style={styles.teamList}>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>
                    {member.email.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberEmail}>{member.email}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    member.status === 'active' ? styles.statusActive : styles.statusPending,
                  ]}
                >
                  <Text style={styles.statusText}>{member.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#2DD4BF', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Team Member</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Role (e.g., Manager, Designer)"
              placeholderTextColor="#6B7280"
              value={role}
              onChangeText={setRole}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={handleAddMember}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#2DD4BF', '#14B8A6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalAddGradient}
                >
                  <Text style={styles.modalAddText}>
                    {loading ? 'Adding...' : 'Add Member'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  addButton: {
    marginBottom: 32,
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
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  teamList: {
    gap: 12,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2332',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2DD4BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberEmail: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  statusPending: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ADE80',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  skipText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A2332',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '600',
  },
  modalAddButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalAddGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalAddText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
