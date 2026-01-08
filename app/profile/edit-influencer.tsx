import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { ChevronLeft, Camera, User, MapPin, FileText, Mail, Phone, Instagram, Youtube, Facebook, X, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import SaveChangesModal from '@/components/ui/SaveChangesModal';

export default function EditInfluencerProfileScreen() {
  const router = useRouter();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [fullName, setFullName] = useState('Amulya Goud');
  const [location, setLocation] = useState('Mumbai, India');
  const [bio, setBio] = useState('Tell us about yourself...');
  const [email, setEmail] = useState('amulyamuscla@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [categories, setCategories] = useState(['Fashion', 'Music', 'Comedy', 'Gaming']);
  const [instagram, setInstagram] = useState('amulyagoud');
  const [youtube, setYoutube] = useState('Amulya Goud');
  const [facebook, setFacebook] = useState('');

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    setShowSaveModal(false);
    router.back();
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  const removeSocialMedia = (platform: 'instagram' | 'youtube' | 'facebook') => {
    if (platform === 'instagram') setInstagram('');
    if (platform === 'youtube') setYoutube('');
    if (platform === 'facebook') setFacebook('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }}
              style={styles.photo}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera color={COLORS.text} size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoLabel}>Tap to change photo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <User color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <MapPin color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bio</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <FileText color={COLORS.textSecondary} size={20} style={styles.textAreaIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Mail color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Phone color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
                <TouchableOpacity onPress={() => removeCategory(category)}>
                  <X color={COLORS.text} size={14} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus color={COLORS.textSecondary} size={20} />
            <Text style={styles.addButtonText}>Add Category</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>

          {instagram && (
            <View style={styles.section}>
              <Text style={styles.label}>Instagram</Text>
              <View style={styles.inputContainer}>
                <Instagram color="#E4405F" size={20} />
                <TextInput
                  style={styles.input}
                  value={instagram}
                  onChangeText={setInstagram}
                  placeholderTextColor={COLORS.textTertiary}
                />
                <TouchableOpacity onPress={() => removeSocialMedia('instagram')}>
                  <X color={COLORS.textSecondary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {youtube && (
            <View style={styles.section}>
              <Text style={styles.label}>YouTube</Text>
              <View style={styles.inputContainer}>
                <Youtube color="#FF0000" size={20} />
                <TextInput
                  style={styles.input}
                  value={youtube}
                  onChangeText={setYoutube}
                  placeholderTextColor={COLORS.textTertiary}
                />
                <TouchableOpacity onPress={() => removeSocialMedia('youtube')}>
                  <X color={COLORS.textSecondary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!facebook ? (
            <View style={styles.section}>
              <Text style={styles.label}>Facebook</Text>
              <View style={styles.inputContainer}>
                <Facebook color="#1877F2" size={20} />
                <TextInput
                  style={styles.input}
                  value={facebook}
                  onChangeText={setFacebook}
                  placeholder="Enter your username"
                  placeholderTextColor={COLORS.textTertiary}
                />
                <TouchableOpacity>
                  <Plus color={COLORS.textSecondary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.section}>
              <Text style={styles.label}>Facebook</Text>
              <View style={styles.inputContainer}>
                <Facebook color="#1877F2" size={20} />
                <TextInput
                  style={styles.input}
                  value={facebook}
                  onChangeText={setFacebook}
                  placeholderTextColor={COLORS.textTertiary}
                />
                <TouchableOpacity onPress={() => removeSocialMedia('facebook')}>
                  <X color={COLORS.textSecondary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <SaveChangesModal
        visible={showSaveModal}
        onSave={handleConfirmSave}
        onCancel={() => setShowSaveModal(false)}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
    paddingTop: 60,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  saveButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.brand.green,
    borderRadius: BORDER_RADIUS.md,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.brand.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  photoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.text,
    paddingVertical: 0,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    minHeight: 100,
  },
  textAreaIcon: {
    marginTop: SPACING.sm,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: SPACING.sm,
    minHeight: 80,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  bottomSpacing: {
    height: 100,
  },
});
