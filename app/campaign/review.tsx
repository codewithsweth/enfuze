import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, X, Check, Rocket } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CampaignReviewScreen() {
  const router = useRouter();
  const [currentStep] = useState(4);
  const totalSteps = 4;

  const handleCreateCampaign = () => {
    router.push('/(tabs)/campaigns');
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>New Campaign</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push('/(tabs)/home')}
        >
          <X color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.stepsLabels}>
          <Text style={[styles.stepLabel, currentStep >= 1 && styles.stepLabelActive]}>Info</Text>
          <Text style={[styles.stepLabel, currentStep >= 2 && styles.stepLabelActive]}>Platform</Text>
          <Text style={[styles.stepLabel, currentStep >= 3 && styles.stepLabelActive]}>Budget</Text>
          <Text style={[styles.stepLabel, currentStep >= 4 && styles.stepLabelActive]}>Review</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.checkIcon}>
              <Check color="#FFFFFF" size={20} />
            </View>
            <Text style={styles.summaryTitle}>Campaign Summary</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Name:</Text>
            <Text style={styles.summaryValue}>manoj</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>2025-12-17 to 2027-12-14</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget:</Text>
            <Text style={styles.summaryValue}>₹25,000 - ₹50,000</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platforms:</Text>
            <Text style={styles.summaryValue}>2 selected</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Audience:</Text>
            <Text style={styles.summaryValue}>2 groups</Text>
          </View>
        </View>

        <View style={styles.platformsCard}>
          <Text style={styles.platformsTitle}>Selected Platforms:</Text>
          <View style={styles.platformsRow}>
            <View style={styles.platformBadge}>
              <Text style={styles.platformIcon}>📷</Text>
              <Text style={styles.platformName}>Instagram</Text>
            </View>
            <View style={styles.platformBadge}>
              <Text style={styles.platformIcon}>👍</Text>
              <Text style={styles.platformName}>Facebook</Text>
            </View>
          </View>
        </View>

        <View style={styles.readyCard}>
          <Rocket color="#F97316" size={24} />
          <Text style={styles.readyText}>
            Ready to launch! Tap "Create Campaign" to connect with influencers.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleCreateCampaign}
        >
          <LinearGradient
            colors={['#F97316', '#EA580C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>Continue ({currentStep}/{totalSteps})</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#000000',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E2837',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E2837',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
  },
  stepsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  stepLabelActive: {
    color: '#F97316',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  checkIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#374151',
  },
  platformsCard: {
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  platformsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  platformsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  platformIcon: {
    fontSize: 16,
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  readyCard: {
    flexDirection: 'row',
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  readyText: {
    flex: 1,
    fontSize: 14,
    color: '#F97316',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#000000',
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
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
