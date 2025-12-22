import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, X, Upload, Calendar, ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  'Fashion', 'Beauty', 'Technology', 'Food', 'Travel',
  'Fitness', 'Gaming', 'Lifestyle', 'Finance', 'Education',
  'Health', 'Entertainment', 'Sports', 'Automobile'
];

const followerRanges = [
  '1K - 10K', '10K - 50K', '50K - 100K', '100K - 500K', '500K - 1M', '1M+'
];

export default function CampaignInfoScreen() {
  const router = useRouter();
  const [currentStep] = useState(1);
  const totalSteps = 4;

  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFollowerRange, setSelectedFollowerRange] = useState('');
  const [targetLocation, setTargetLocation] = useState('');

  const handleContinue = () => {
    router.push('/campaign/platform');
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
        <TouchableOpacity style={styles.imageUploadCard}>
          <View style={styles.uploadIcon}>
            <Upload color="#F97316" size={24} />
          </View>
          <Text style={styles.uploadTitle}>Add Campaign Image</Text>
          <Text style={styles.uploadSubtitle}>Tap to upload</Text>
        </TouchableOpacity>

        <View style={styles.field}>
          <Text style={styles.label}>Campaign Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Summer Fashion 2025"
            placeholderTextColor="#6B7280"
            value={campaignName}
            onChangeText={setCampaignName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief overview of campaign goals..."
            placeholderTextColor="#6B7280"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Duration</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInput}>
              <Calendar color="#6B7280" size={20} />
              <TextInput
                style={styles.dateText}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#6B7280"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <View style={styles.dateInput}>
              <Calendar color="#6B7280" size={20} />
              <TextInput
                style={styles.dateText}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#6B7280"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Goals (KPIs)</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>Select Followers range</Text>
            <ChevronDown color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category *</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>Select a category...</Text>
            <ChevronDown color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Target Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Mumbai, India"
            placeholderTextColor="#6B7280"
            value={targetLocation}
            onChangeText={setTargetLocation}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
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
  imageUploadCard: {
    backgroundColor: '#1E2837',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E2837',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2837',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E2837',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
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
