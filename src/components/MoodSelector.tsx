import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme/theme';

// Blob-style mood data matching the first reference image
const MOODS = [
  { emoji: '😠', label: 'Angry',   bg: '#FF6B6B', shadow: '#D94040' },
  { emoji: '😟', label: 'Sad',     bg: '#FFA552', shadow: '#D4742A' },
  { emoji: '😐', label: 'Neutral', bg: '#7B8FA1', shadow: '#546172' },
  { emoji: '🙂', label: 'Good',    bg: '#66BB6A', shadow: '#388E3C' },
  { emoji: '😄', label: 'Joyful',  bg: '#4CAF90', shadow: '#2E7D5E' },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelect: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {MOODS.map((mood) => {
        const isSelected = selectedMood === mood.label;
        return (
          <TouchableOpacity
            key={mood.label}
            style={styles.item}
            onPress={() => onSelect(mood.label)}
            activeOpacity={0.75}
          >
            {/* Circular emoji blob */}
            <View
              style={[
                styles.blob,
                { backgroundColor: mood.bg },
                isSelected && styles.blobSelected,
                isSelected && { shadowColor: mood.shadow },
              ]}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
            </View>
            <Text style={[styles.label, isSelected && { color: mood.bg, fontWeight: '700' }]}>
              {mood.label}
            </Text>
            {isSelected && <View style={[styles.dot, { backgroundColor: mood.bg }]} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: Spacing.md,
    gap: 20, // Increased gap for premium feel
    paddingVertical: 12,
  },
  item: {
    alignItems: 'center',
    width: 64,
  },
  blob: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F3F4F6', // Default neutral bg
  },
  blobSelected: {
    transform: [{ scale: 1.15 }],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 6,
  },
});
