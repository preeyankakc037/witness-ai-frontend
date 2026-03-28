import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme/theme';

interface StateSliderProps {
  label: string;
  value: number; // 0 (Low) to 2 (High)
  onChange: (val: number) => void;
  activeColor: string;
}

const OPTIONS = ['Low', 'Medium', 'High'];

export const StateSlider: React.FC<StateSliderProps> = ({ label, value, onChange, activeColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track}>
        {OPTIONS.map((opt, i) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.option,
              value === i && { backgroundColor: activeColor },
            ]}
            onPress={() => onChange(i)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.optionText,
                value === i && styles.optionTextActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  track: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F2',
    borderRadius: Radius.full,
    padding: 4,
    height: 44,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.full,
  },
  optionText: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
  },
  optionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
