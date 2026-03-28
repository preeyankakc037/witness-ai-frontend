import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  FlatList, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'mind', label: 'Mind', emoji: '🧠' },
  { id: 'body', label: 'Body', emoji: '💪' },
  { id: 'social', label: 'Social', emoji: '💬' },
  { id: 'reset', label: 'Reset', emoji: '🌿' },
];

const NUDGES = [
  { id: '1', title: 'Take a 10-minute walk', duration: '10 min', icon: '🚶', category: 'body' },
  { id: '2', title: 'Drink a glass of water', duration: '1 min', icon: '💧', category: 'body' },
  { id: '3', title: 'Text a friend', duration: '2 min', icon: '💬', category: 'social' },
  { id: '4', title: '2-min breathing exercise', duration: '2 min', icon: '🧘', category: 'mind' },
  { id: '5', title: 'Stretch your body', duration: '5 min', icon: '🧘‍♂️', category: 'body' },
  { id: '6', title: 'Quick Journaling', duration: '3 min', icon: '📝', category: 'mind' },
];

export const NudgeScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [selectedCat, setSelectedCat] = useState('all');

  const themeBg = user.gender === 'female' ? Colors.softPink : user.gender === 'male' ? Colors.softBlue : Colors.softGreen;
  const themeText = Colors.primary;
  const themeAccent = user.gender === 'female' ? '#F9A8D4' : user.gender === 'male' ? '#A5B4FC' : '#A7F3D0';

  const filteredNudges = selectedCat === 'all'
    ? NUDGES
    : NUDGES.filter(n => n.category === selectedCat);

  const renderNudge = ({ item }: { item: typeof NUDGES[0] }) => (
    <View style={styles.nudgeCard}>
      <View style={styles.nudgeIconWrap}>
        <Text style={styles.nudgeEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.nudgeText}>
        <Text style={styles.nudgeTitle}>{item.title}</Text>
        <Text style={styles.nudgeDuration}>{item.duration}</Text>
      </View>
      <TouchableOpacity
        style={[styles.startBtn, { backgroundColor: Colors.silver, borderColor: Colors.border }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.startBtnText, { color: Colors.primary }]}>Start</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#000000' }]}>Nudges</Text>
        <Text style={styles.subtitle}>Small actions, big difference</Text>
      </View>

      <View style={styles.categoriesWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCat(cat.id)}
              style={[
                styles.catBtn,
                selectedCat === cat.id && styles.catBtnActive
              ]}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text style={[
                styles.catLabel,
                selectedCat === cat.id && styles.catLabelActive
              ]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Horizontal scroll indicator (aesthetic only) */}
        <View style={styles.scrollIndicator} />
      </View>

      <FlatList
        data={filteredNudges}
        renderItem={renderNudge}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  categoriesWrap: {
    marginBottom: Spacing.md,
  },
  categoriesScroll: {
    paddingHorizontal: Spacing.lg,
    gap: 12,
    paddingBottom: 16,
  },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catBtnActive: {
    backgroundColor: Colors.silver,
    borderColor: Colors.primary,
  },
  catEmoji: {
    fontSize: 16,
    marginRight: 6,
    color: Colors.primary,
  },
  catLabel: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
  },
  catLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  scrollIndicator: {
    height: 4,
    backgroundColor: '#9CA3AF',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 2,
    opacity: 0.6,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 10,
    gap: 12,
  },
  nudgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    ...Shadows.sm,
  },
  nudgeIconWrap: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nudgeEmoji: {
    fontSize: 24,
  },
  nudgeText: {
    flex: 1,
    marginLeft: 12,
  },
  nudgeTitle: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  nudgeDuration: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  startBtn: {
    backgroundColor: Colors.silver,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  startBtnText: {
    ...Typography.captionMedium,
    color: Colors.primary,
    fontWeight: '700',
  },
});
