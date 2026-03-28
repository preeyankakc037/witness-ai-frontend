import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Switch, TouchableOpacity, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

export const SettingsScreen = () => {
  const { user, setUser } = useApp();
  const insets = useSafeAreaInsets();

  const themeBg = Colors.silver;
  const themeBorder = Colors.border;
  const themeText = Colors.primary;

  const toggleReminders = () => {
    setUser({ ...user, remindersEnabled: !user.remindersEnabled });
  };

  return (
    <View style={[styles.safe, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={28} color={Colors.textPrimary} style={{ marginRight: 10 }} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <Text style={styles.sectionLabel}>PROFILE</Text>
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: themeBg, borderColor: themeBorder }]}>
              <Ionicons name={user.isGuest ? 'person-outline' : 'person'} size={32} color={themeText} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user.isGuest ? 'Guest User' : user.name || 'Alex'}
              </Text>
              <Text style={styles.profileEmail}>
                {user.isGuest ? 'Not logged in' : user.email || 'alex@email.com'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: themeBg }]}>
            <Ionicons name={user.isGuest ? 'log-in-outline' : 'create-outline'} size={18} color={themeText} style={{ marginRight: 8 }} />
            <Text style={[styles.actionBtnText, { color: themeText }]}>
              {user.isGuest ? 'Login / Sign Up' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reminders Section */}
        <Text style={styles.sectionLabel}>REMINDERS</Text>
        <View style={styles.card}>
          <View style={[styles.row, styles.rowBorder]}>
            <View style={styles.rowLabelGroup}>
              <Ionicons name="notifications-outline" size={22} color={Colors.primary} style={{ marginRight: 12 }} />
              <Text style={styles.rowLabel}>Daily Reminders</Text>
            </View>
            <Switch
              value={user.remindersEnabled}
              onValueChange={toggleReminders}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={[styles.row, styles.rowBorder, !user.remindersEnabled && styles.disabled]}>
            <View style={styles.rowLabelGroup}>
              <Ionicons name="sunny-outline" size={22} color={Colors.accent} style={{ marginRight: 12 }} />
              <Text style={styles.rowLabel}>Wake-up check-in</Text>
            </View>
            <TextInput
              style={styles.rowValue}
              value={user.wakeTime}
              onChangeText={(text) => setUser({ ...user, wakeTime: text })}
              placeholder="08:00 AM"
              editable={user.remindersEnabled}
            />
          </View>
          <View style={[styles.row, !user.remindersEnabled && styles.disabled]}>
            <View style={styles.rowLabelGroup}>
              <Ionicons name="moon-outline" size={22} color={Colors.textMuted} style={{ marginRight: 12 }} />
              <Text style={styles.rowLabel}>Evening reflection</Text>
            </View>
            <TextInput
              style={styles.rowValue}
              value={user.sleepTime}
              onChangeText={(text) => setUser({ ...user, sleepTime: text })}
              placeholder="09:30 PM"
              editable={user.remindersEnabled}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.card}>
          <TouchableOpacity style={[styles.row, styles.rowBorder]}>
            <View style={styles.rowLabelGroup}>
              <Ionicons name="key-outline" size={22} color={Colors.textSecondary} style={{ marginRight: 12 }} />
              <Text style={styles.rowLabel}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLabelGroup}>
              <Ionicons name="help-circle-outline" size={22} color={Colors.textSecondary} style={{ marginRight: 12 }} />
              <Text style={styles.rowLabel}>FAQs & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <View style={styles.card}>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>SDK</Text>
            <Text style={styles.rowValue}>Expo 54</Text>
          </View>
        </View>

        {/* Logout */}
        {!user.isGuest && (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setUser({ ...user, isGuest: true, name: '', email: '' })}
          >
            <Ionicons name="log-out-outline" size={22} color={Colors.error} style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.footer}>Made with 💚 for your wellbeing.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  headerTitle: { ...Typography.title, color: Colors.textPrimary },
  scroll: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 60,
    gap: 8,
  },
  sectionLabel: {
    ...Typography.tiny,
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 6,
    marginLeft: 4,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    ...Shadows.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileInfo: { flex: 1 },
  profileName: { ...Typography.subheading, color: Colors.textPrimary, marginBottom: 2 },
  profileEmail: { ...Typography.caption, color: Colors.textSecondary },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.silver,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionBtnText: { ...Typography.captionMedium, color: Colors.primary },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  rowLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowLabel: { ...Typography.body, color: Colors.textPrimary },
  rowValue: { 
    ...Typography.bodyMedium, 
    color: Colors.textSecondary,
    textAlign: 'right',
    padding: 0, // removed for Android default padding
    minWidth: 80,
  },
  disabled: { opacity: 0.45 },
  logoutBtn: {
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: Radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: { ...Typography.subheading, color: Colors.error },
  footer: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
});
