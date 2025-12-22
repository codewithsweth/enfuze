import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CampaignHeader from '@/components/campaign/CampaignHeader';
import ProgressIndicator from '@/components/campaign/ProgressIndicator';
import PlatformCard from '@/components/campaign/PlatformCard';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Radio from '@/components/ui/Radio';
import Button from '@/components/ui/Button';
import { PLATFORMS, AGE_GROUPS, GENDERS } from '@/constants/campaign';
import { COLORS, SPACING } from '@/constants/theme';

const CAMPAIGN_STEPS = ['Info', 'Platform', 'Budget', 'Review'];

export default function CampaignPlatformScreen() {
  const router = useRouter();
  const currentStep = 2;

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [landingPage, setLandingPage] = useState('');
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState('all');

  const handleContinue = () => {
    router.push('/campaign/budget');
  };

  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleAgeGroup = (ageGroupId: string) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(ageGroupId)
        ? prev.filter((id) => id !== ageGroupId)
        : [...prev, ageGroupId]
    );
  };

  return (
    <View style={styles.container}>
      <CampaignHeader
        title="New Campaign"
        onBack={() => router.back()}
        onClose={handleClose}
      />

      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={CAMPAIGN_STEPS.length}
        steps={CAMPAIGN_STEPS}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Input
          label="Landing Page (Optional)"
          placeholder="https://yoursite.com/campaign"
          value={landingPage}
          onChangeText={setLandingPage}
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Platforms *</Text>
          <View style={styles.platformsGrid}>
            {PLATFORMS.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                selected={selectedPlatforms.includes(platform.id)}
                onPress={() => togglePlatform(platform.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.targetEmoji}>🎯</Text>
            <Text style={styles.sectionLabel}>Target Audience *</Text>
          </View>
          {AGE_GROUPS.map((ageGroup) => (
            <Checkbox
              key={ageGroup.id}
              label={ageGroup.label}
              checked={selectedAgeGroups.includes(ageGroup.id)}
              onPress={() => toggleAgeGroup(ageGroup.id)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.targetEmoji}>🎯</Text>
            <Text style={styles.sectionLabel}>Target Gender *</Text>
          </View>
          {GENDERS.map((gender) => (
            <Radio
              key={gender.id}
              label={gender.label}
              selected={selectedGender === gender.id}
              onPress={() => setSelectedGender(gender.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue (${currentStep}/${CAMPAIGN_STEPS.length})`}
          onPress={handleContinue}
          variant="secondary"
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.xxl,
    paddingBottom: 100,
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  targetEmoji: {
    fontSize: 16,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.xxl,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
});
