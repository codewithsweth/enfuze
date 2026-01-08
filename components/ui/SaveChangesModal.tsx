import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '@/constants/theme';

interface SaveChangesModalProps {
  visible: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function SaveChangesModal({ visible, onSave, onCancel }: SaveChangesModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Save Changes?</Text>
          <Text style={styles.modalSubtitle}>Do you want to save your changes?</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.yesButtonWrapper} onPress={onSave}>
              <LinearGradient
                colors={['#00D09E', '#00A67E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.yesButton}
              >
                <Text style={styles.yesButtonText}>Yes</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  modalSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
  },
  modalButtons: {
    width: '100%',
    gap: SPACING.md,
  },
  yesButtonWrapper: {
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  yesButton: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  noButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.cardDark,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
});
