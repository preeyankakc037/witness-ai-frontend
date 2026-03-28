import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

interface MindyCardProps {
  onPress: () => void;
}

export const MindyCard: React.FC<MindyCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles-outline" size={28} color={Colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Talk with Mindy</Text>
          <Text style={styles.subtitle}>Start your conversation, what's on mind.</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>Start Conversation</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    ...Shadows.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E8F5F0',
  },
  content: {
    alignItems: 'center',
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...Typography.heading,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  btn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.full,
    alignItems: 'center',
    ...Shadows.sm,
  },
  btnText: {
    ...Typography.subheading,
    color: '#FFFFFF',
  },
});
