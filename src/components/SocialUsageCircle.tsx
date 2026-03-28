import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MOCK_DATA = [
  { name: 'Instagram', time: '2h 10m' },
  { name: 'Facebook',  time: '50m' },
  { name: 'YouTube',   time: '24m' },
];

export const SocialUsageCircle = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    if (!hasAccess) {
      // Simulate "Access Flow"
      setHasAccess(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.circle,
          expanded && styles.circleExpanded,
        ]}
        onPress={toggle}
        activeOpacity={0.88}
      >
        {!expanded ? (
          <View style={styles.collapsedContent}>
            <Text style={styles.zeroText}>{hasAccess ? '3' : '0'}</Text>
            <View style={styles.badge}>
              <Ionicons name="apps" size={14} color="#FFFFFF" />
            </View>
          </View>
        ) : (
          <View style={styles.expandedContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.dateText}>{today}</Text>
                <Text style={styles.title}>Social Media Usage</Text>
              </View>
              <Ionicons name="close-circle-outline" size={24} color={Colors.textMuted} />
            </View>
            
            <View style={styles.usageList}>
              {MOCK_DATA.map((app) => (
                <View key={app.name} style={styles.appRow}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <Text style={styles.appTime}>{app.time}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.totalText}>Total Today: 3h 24m</Text>
          </View>
        )}
      </TouchableOpacity>
      {!expanded && (
         <Text style={styles.hintText}>Social Media Usage</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
    borderWidth: 1,
    borderColor: '#E8F5F0',
  },
  circleExpanded: {
    width: '92%',
    height: 'auto',
    borderRadius: Radius.md,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    alignItems: 'stretch',
  },
  collapsedContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroText: {
    ...Typography.heroTitle,
    fontSize: 42,
    color: Colors.primary,
  },
  badge: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  expandedContent: {
    width: '100%',
  },
  header: {
    flexDirection: 'row', // Updated to handle header
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F2',
    paddingBottom: 10,
    marginBottom: 14,
  },
  dateText: { ...Typography.caption, color: Colors.textSecondary },
  title: { ...Typography.heading, fontSize: 18, color: Colors.textPrimary },
  usageList: { gap: 10, marginBottom: 14 },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: { ...Typography.bodyMedium, color: Colors.textPrimary },
  appTime: { ...Typography.captionMedium, color: Colors.textSecondary },
  totalText: {
    ...Typography.bodyMedium,
    color: Colors.accent,
    textAlign: 'center',
    marginTop: 6,
  },
  hintText: {
    ...Typography.captionMedium,
    color: Colors.textMuted,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
