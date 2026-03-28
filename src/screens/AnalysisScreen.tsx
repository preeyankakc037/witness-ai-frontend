import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { InsightCard } from '../components/InsightCard';

const WEEK_DATA = [
  { day: 'M', value: 0.4, active: false },
  { day: 'T', value: 0.2, active: false },
  { day: 'W', value: 0.6, active: false },
  { day: 'T', value: 0.3, active: false },
  { day: 'F', value: 0.7, active: false },
  { day: 'S', value: 0.5, active: false },
  { day: 'S', value: 0.9, active: true },
];

export const AnalysisScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="pulse" size={28} color={Colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Your Patterns</Text>
        </View>
        <Text style={styles.headerSub}>Based on your reflections</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Chart Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Mood</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: Colors.softBlue }]} />
              <Text style={styles.legendLabel}>Active</Text>
            </View>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartArea}>
            {/* Y-axis grid lines */}
            {[0.75, 0.5, 0.25].map((pos, i) => (
              <View
                key={i}
                style={[styles.gridLine, { bottom: `${pos * 100}%` as any }]}
              />
            ))}

            {/* Bars */}
            <View style={styles.barsRow}>
              {WEEK_DATA.map((item, i) => (
                <View key={i} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${item.value * 100}%`,
                          backgroundColor: item.active
                            ? Colors.softBlue // Palette Blue
                            : Colors.softPink, // Palette Pink
                          borderColor: item.active ? '#94A3B8' : '#FBCFE8',
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.dayLabel, item.active && styles.dayLabelActive]}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={[styles.summaryCard, { backgroundColor: Colors.softPink }]}>
          <Text style={[styles.summaryTitle, { color: Colors.primary, opacity: 0.8 }]}>This Week</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>5</Text>
              <Text style={[styles.summaryLabel, { color: Colors.primary }]}>Check-ins</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: Colors.primary, opacity: 0.2 }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>82%</Text>
              <Text style={[styles.summaryLabel, { color: Colors.primary }]}>Mood score</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: Colors.primary, opacity: 0.2 }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>3</Text>
              <Text style={[styles.summaryLabel, { color: Colors.primary }]}>Reflections</Text>
            </View>
          </View>
        </View>

        {/* Insight Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Key Insights</Text>
        </View>

        <InsightCard
          iconName="time-outline"
          iconColor={Colors.primary}
          text="Evening Reflection Pattern"
          subtext="Reflecting before 9 PM helps your sleep score."
          variant="default"
        />
        <InsightCard
          iconName="trending-up-outline"
          iconColor={Colors.primary}
          text="Upward Weekly Trend"
          subtext="Your mood has improved by 15% this week."
          variant="success"
        />
        <InsightCard
          iconName="heart-outline"
          iconColor={Colors.primary}
          text="Strong Connection Scores"
          subtext="Social interaction is lifting your general mood."
          variant="default"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: { ...Typography.title, color: Colors.textPrimary },
  headerSub: { ...Typography.caption, color: Colors.textSecondary },

  scroll: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 40,
    gap: 16,
  },

  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadows.md,
    marginBottom: Spacing.md,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  chartTitle: { ...Typography.subheading, color: Colors.textPrimary },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { ...Typography.caption, color: Colors.textSecondary },

  chartArea: {
    height: 160,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderStyle: 'dashed',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 24,
  },
  barCol: { alignItems: 'center', flex: 1, height: '100%' },
  barTrack: {
    flex: 1,
    width: 20,
    justifyContent: 'flex-end',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
  },
  dayLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    marginTop: 6,
    position: 'absolute',
    bottom: 2,
  },
  dayLabelActive: { color: Colors.softBlue, fontWeight: '700' },

  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryTitle: {
    ...Typography.captionMedium,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  summaryLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    ...Typography.subheading,
    color: Colors.textPrimary,
  },
});
