import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SUGGESTIONS = [
  { id: '1', text: 'Step outside for 5 minutes', icon: 'walk' },
  { id: '2', text: 'Message one person',         icon: 'chatbubble-outline' },
  { id: '3', text: 'Start a small task',         icon: 'checkmark-circle-outline' },
];

export const ActionSuggestions = () => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainBtn}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <Text style={styles.mainBtnText}>What should I do now?</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#FFFFFF"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.suggestions}>
          {SUGGESTIONS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.suggestionItem} activeOpacity={0.7}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={20} color={Colors.accent} />
              </View>
              <Text style={styles.suggestionText}>{item.text}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  mainBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: Radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  mainBtnText: {
    ...Typography.subheading,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  suggestions: {
    marginTop: 12,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: '#EEE9FF',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F2FF',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    flex: 1,
  },
});
