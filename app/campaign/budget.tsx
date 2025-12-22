import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Lightbulb } from 'lucide-react-native';
import CampaignHeader from '@/components/campaign/CampaignHeader';
import ProgressIndicator from '@/components/campaign/ProgressIndicator';
import BudgetCard from '@/components/campaign/BudgetCard';
import Button from '@/components/ui/Button';
import { BUDGET_RANGES } from '@/constants/campaign';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

const CAMPAIGN_STEPS = ['Info', 'Platform', 'Budget', 'Review'];

export default function CampaignBudgetScreen() {
  const router = useRouter();
  const currentStep = 3;

  const [budgetRange, setBudgetRange] = useState('50,000 - 1,00,000');
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const handleContinue = () => {
    router.push('/campaign/review');
  };

  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  const handleSelectRange = (rangeId: string, label: string) => {
    setSelectedRange(rangeId);
    const cleanLabel = label.replace('₹', '');
    setBudgetRange(cleanLabel);
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
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Budget Range *</Text>
          <View style={styles.budgetInput}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.budgetText}
              value={budgetRange}
              onChangeText={setBudgetRange}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quick select:</Text>
          <View style={styles.rangesGrid}>
            {BUDGET_RANGES.map((range) => (
              <BudgetCard
                key={range.id}
                range={range}
                selected={selectedRange === range.id}
                onPress={() => handleSelectRange(range.id, range.label)}
              />
            ))}
          </View>
        </View>

        <View style={styles.tipCard}>
          <Lightbulb color={COLORS.info} size={20} />
          <View style={styles.tipContent}>
            <Text style={styles.tipText}>
              Tip: Higher budgets attract premium influencers with better engagement.
            </Text>
          </View>
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
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  budgetInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.secondary,
    marginRight: SPACING.sm,
  },
  budgetText: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
  rangesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#0F2942',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.info,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: FONT_SIZES.md,
    color: '#93C5FD',
    lineHeight: 20,
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
