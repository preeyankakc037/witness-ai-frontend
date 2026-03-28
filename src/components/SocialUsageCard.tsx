import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

interface AppUsage {
  name: string;
  time: string;
  percent: number;
}

const MOCK_APPS: AppUsage[] = [
  { name: 'Instagram', time: '2h 10m', percent: 0.65 },
  { name: 'TikTok',    time: '50m',     percent: 0.25 },
  { name: 'YouTube',   time: '24m',     percent: 0.12 },
];

export const SocialUsageCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Screen Awareness</Text>
      <Text style={styles.totalTime}>3h 24m on social apps</Text>

      <View style={styles.breakdown}>
        {MOCK_APPS.map((app) => (
          <View key={app.name} style={styles.appRow}>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appTime}>{app.time}</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${app.percent * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.insightBox}>
        <Text style={styles.insightText}>
          Higher usage may affect mood and focus.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    ...Shadows.md,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  totalTime: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  breakdown: {
    gap: 14,
    marginBottom: 20,
  },
  appRow: {
    gap: 6,
  },
  appInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  appTime: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#F1F3F2',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  insightBox: {
    borderTopWidth: 1,
    borderTopColor: '#F1F3F2',
    paddingTop: 12,
  },
  insightText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});
