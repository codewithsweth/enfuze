import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Lightbulb } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TemplateCard from '@/components/campaign/TemplateCard';
import { CAMPAIGN_TEMPLATES } from '@/constants/campaign';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

export default function SelectTemplateScreen() {
  const router = useRouter();

  const handleCreateManually = () => {
    router.push('/campaign/info');
  };

  const handleSelectTemplate = (templateId: string) => {
    router.push({
      pathname: '/campaign/info',
      params: { template: templateId },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Template</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity style={styles.manualCard} onPress={handleCreateManually}>
          <LinearGradient
            colors={COLORS.gradient.secondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.manualGradient}
          >
            <View style={styles.manualLeft}>
              <View style={styles.plusIcon}>
                <Plus color={COLORS.secondary} size={32} />
              </View>
              <View>
                <Text style={styles.manualTitle}>Create Manually</Text>
                <Text style={styles.manualDescription}>Build your own custom campaign</Text>
              </View>
            </View>
            <Lightbulb color={COLORS.text} size={24} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CHOOSE A TEMPLATE</Text>
          <View style={styles.dividerLine} />
        </View>

        {CAMPAIGN_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPress={() => handleSelectTemplate(template.id)}
          />
        ))}

        <View style={styles.proTipCard}>
          <Lightbulb color={COLORS.warning} size={20} />
          <View style={styles.proTipContent}>
            <Text style={styles.proTipTitle}>Pro Tip</Text>
            <Text style={styles.proTipText}>
              Templates are pre-filled with best practices and can be fully customized to match your brand!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    gap: SPACING.lg,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.xxl,
    paddingBottom: 40,
  },
  manualCard: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.xxl,
  },
  manualGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.xl,
  },
  manualLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  plusIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  manualDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    opacity: 0.9,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    gap: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
  proTipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  proTipContent: {
    flex: 1,
  },
  proTipTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.warning,
    marginBottom: 4,
  },
  proTipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
