import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

interface VerticalLevelProps {
  label: string;
  value: number; // 0 to 5
  onChange: (val: number) => void;
  activeColor: string;
}

const LEVELS = [1, 2, 3, 4, 5];

export const VerticalLevel: React.FC<VerticalLevelProps> = ({ label, value, onChange, activeColor }) => {
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {LEVELS.slice().reverse().map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.pill,
              { backgroundColor: value >= level ? activeColor : '#F1F3F2' },
              value >= level && { opacity: 0.3 + (level * 0.14) }
            ]}
            onPress={() => onChange(level)}
            activeOpacity={0.8}
          />
        ))}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 84, // Increased from 70
  },
  track: {
    height: 180,
    width: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: 6,
    justifyContent: 'space-between',
    marginBottom: 8,
    ...Shadows.sm,
  },
  pill: {
    height: 28,
    width: '100%',
    borderRadius: 14,
  },
  label: {
    ...Typography.tiny,
    fontSize: 9, // Slightly smaller
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5, // Reduced spacing
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 4,
    width: '100%',
  },
});
