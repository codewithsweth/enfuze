import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ChevronLeft, Camera, Briefcase, FileText, MapPin, Mail, Phone, Globe, Instagram, Youtube, Facebook, X, Upload, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';
import SaveChangesModal from '@/components/ui/SaveChangesModal';

interface Document {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
  icon: string;
  color: string;
}

export default function EditBrandProfileScreen() {
  const router = useRouter();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [brandName, setBrandName] = useState('Nike');
  const [role, setRole] = useState('Brand Manager @ Nike');
  const [tagline, setTagline] = useState('Just Do It');
  const [industry, setIndustry] = useState('Sports & Lifestyle Brand');
  const [location, setLocation] = useState('Beaverton, Oregon, USA');
  const [about, setAbout] = useState('Tell us about your brand...');
  const [email, setEmail] = useState('priya@nike.com');
  const [phone, setPhone] = useState('+91 9829565881');
  const [website, setWebsite] = useState('www.nike.com');
  const [instagram, setInstagram] = useState('nikeindia');
  const [youtube, setYoutube] = useState('Nike India');
  const [facebook, setFacebook] = useState('Nike India');

  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'PAN Card',
      status: 'verified',
      icon: '💳',
      color: '#9B59B6',
    },
    {
      id: '2',
      name: 'National ID / Aadhaar',
      status: 'pending',
      icon: '🆔',
      color: '#00D09E',
    },
    {
      id: '3',
      name: 'GST Certificate',
      status: 'failed',
      icon: '📋',
      color: '#FF9F0A',
    },
    {
      id: '4',
      name: 'Business License',
      status: 'pending',
      icon: '📄',
      color: '#1877F2',
    },
  ]);

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    setShowSaveModal(false);
    router.back();
  };

  const removeSocialMedia = (platform: 'instagram' | 'youtube' | 'facebook') => {
    if (platform === 'instagram') setInstagram('');
    if (platform === 'youtube') setYoutube('');
    if (platform === 'facebook') setFacebook('');
  };

  const handleDocumentAction = (docId: string, status: Document['status']) => {
    if (status === 'failed') {
      Alert.alert('Re-upload Document', 'Please upload a valid document');
    } else if (status === 'pending') {
      Alert.alert('Upload Document', 'Click to upload your document');
    }
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
              source={{ uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' }}
              style={styles.photo}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera color={COLORS.text} size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoLabel}>Tap to change logo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Brand Name</Text>
          <View style={styles.inputContainer}>
            <Briefcase color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={brandName}
              onChangeText={setBrandName}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Your Role</Text>
          <View style={styles.inputContainer}>
            <Briefcase color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={role}
              onChangeText={setRole}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tagline</Text>
          <View style={styles.inputContainer}>
            <FileText color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={tagline}
              onChangeText={setTagline}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Industry</Text>
          <View style={styles.inputContainer}>
            <Briefcase color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={industry}
              onChangeText={setIndustry}
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
          <Text style={styles.label}>About</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <FileText color={COLORS.textSecondary} size={20} style={styles.textAreaIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={about}
              onChangeText={setAbout}
              multiline
              numberOfLines={4}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Mail color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={COLORS.textTertiary}
            />
            <TouchableOpacity>
              <X color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
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
            <TouchableOpacity>
              <X color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Website</Text>
          <View style={styles.inputContainer}>
            <Globe color={COLORS.textSecondary} size={20} />
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              keyboardType="url"
              placeholderTextColor={COLORS.textTertiary}
            />
            <TouchableOpacity>
              <X color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Social Media</Text>

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

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Upload Documents</Text>

        {documents.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.documentCard}
            onPress={() => handleDocumentAction(doc.id, doc.status)}
          >
            <View style={[styles.documentIcon, { backgroundColor: doc.color + '20' }]}>
              <Text style={styles.documentEmoji}>{doc.icon}</Text>
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <View style={styles.documentStatusContainer}>
                {doc.status === 'verified' && (
                  <>
                    <CheckCircle color={COLORS.brand.green} size={12} />
                    <Text style={[styles.documentStatus, { color: COLORS.brand.green }]}>
                      Verified
                    </Text>
                  </>
                )}
                {doc.status === 'pending' && (
                  <>
                    <AlertCircle color="#FF9F0A" size={12} />
                    <Text style={[styles.documentStatus, { color: '#FF9F0A' }]}>
                      Pending for verification
                    </Text>
                  </>
                )}
                {doc.status === 'failed' && (
                  <>
                    <AlertCircle color={COLORS.error} size={12} />
                    <Text style={[styles.documentStatus, { color: COLORS.error }]}>
                      Verification Failed
                    </Text>
                  </>
                )}
              </View>
            </View>
            {doc.status === 'verified' && (
              <View style={styles.verifiedBadge}>
                <CheckCircle color={COLORS.text} size={20} fill={COLORS.brand.green} />
              </View>
            )}
            {doc.status === 'pending' && (
              <TouchableOpacity style={styles.uploadButton}>
                <Upload color={COLORS.textSecondary} size={20} />
              </TouchableOpacity>
            )}
            {doc.status === 'failed' && (
              <TouchableOpacity style={styles.reuploadButton}>
                <Text style={styles.reuploadButtonText}>Reupload</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        {documents.some((doc) => doc.status === 'failed') && (
          <View style={styles.warningBanner}>
            <AlertCircle color={COLORS.warning} size={16} />
            <Text style={styles.warningText}>
              Document rejected! Invalid format or unclear image. Please upload a clear copy.
            </Text>
          </View>
        )}

        <Text style={styles.acceptedFormats}>
          Accepted formats: PDF, JPG, PNG (Max 5MB per file)
        </Text>

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
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  documentEmoji: {
    fontSize: 24,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  documentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  documentStatus: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  verifiedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reuploadButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.sm,
  },
  reuploadButtonText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: 'rgba(255, 159, 10, 0.1)',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.warning,
    marginBottom: SPACING.md,
  },
  warningText: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    color: COLORS.warning,
    lineHeight: 18,
  },
  acceptedFormats: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.brand.green,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  bottomSpacing: {
    height: 100,
  },
});
