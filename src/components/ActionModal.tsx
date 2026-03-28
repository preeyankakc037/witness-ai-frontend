import React from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: 'mood' | 'note' | 'reflection') => void;
}

const OPTIONS = [
  { key: 'mood' as const, icon: '📝', label: 'Log Mood', sub: 'Record how you feel right now' },
  { key: 'note' as const, icon: '✏️', label: 'Quick Note', sub: 'Write a thought or observation' },
  { key: 'reflection' as const, icon: '💬', label: 'Start Reflection', sub: 'Talk to your AI companion' },
];

export const ActionModal: React.FC<ActionModalProps> = ({ visible, onClose, onSelect }) => {
  const { user } = useApp();

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              <Text style={styles.title}>What would you like to do?</Text>

              {OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={styles.option}
                  onPress={() => { onClose(); onSelect(opt.key); }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconWrap, { backgroundColor: Colors.silver, borderColor: Colors.border, borderWidth: 1 }]}>
                    <Text style={styles.optIcon}>{opt.icon}</Text>
                  </View>
                  <View style={styles.optText}>
                    <Text style={styles.optLabel}>{opt.label}</Text>
                    <Text style={styles.optSub}>{opt.sub}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    paddingTop: 16,
    ...Shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  optIcon: { fontSize: 20 },
  optText: { flex: 1 },
  optLabel: { ...Typography.subheading, color: Colors.textPrimary, marginBottom: 2 },
  optSub: { ...Typography.caption, color: Colors.textSecondary },
  arrow: { fontSize: 22, color: Colors.textMuted },
  cancelBtn: {
    alignItems: 'center',
    marginTop: Spacing.md,
    padding: Spacing.md,
  },
  cancelText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
});
