import React, { useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  Dimensions, Platform, Modal, LayoutAnimation, UIManager 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

// Sub-components
import { VerticalLevel } from '../components/VerticalLevel';
import { MindyCard } from '../components/MindyCard';
import { DynamicAvatar } from '../components/DynamicAvatar';
import { GenderSticker } from '../components/GenderSticker';

const { width } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const TodayScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  const [isNudgeExpanded, setIsNudgeExpanded] = useState(false);

  // State for vertical levels: 1 to 5
  const [energy, setEnergy] = useState(3);
  const [pressure, setPressure] = useState(2);
  const [connection, setConnection] = useState(4);

  // Dynamic Day Counter
  const daysActive = useMemo(() => {
    if (!user.createdAt) return 1;
    const diff = Date.now() - user.createdAt;
    return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1);
  }, [user.createdAt]);

  // Dynamic Greeting
  const greeting = useMemo(() => {
    if (user.gender === 'female') return "Hey, Beautiful";
    if (user.gender === 'male') return "Hey, Handsome";
    return "Hey, Friend";
  }, [user.gender]);

  const subGreeting = useMemo(() => {
    const hours = new Date().getHours();
    const timeOfDay = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';
    const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    return `Happy ${timeOfDay}, ${date}`;
  }, []);

  // Dynamic Nudge Logic (based on user feedback)
  const todaysNudge = useMemo(() => {
    if (pressure >= 4) return { id: '4', title: '2-min breathing exercise', duration: '2 min', icon: '🧘' };
    if (energy <= 2) return { id: '2', title: 'Drink a glass of water', duration: '1 min', icon: '💧' };
    if (connection <= 2) return { id: '3', title: 'Text a friend', duration: '2 min', icon: '💬' };
    return { id: '1', title: 'Take a 10-minute walk', duration: '10 min', icon: '🚶' };
  }, [energy, pressure, connection]);

  // Smarter Insight Logic
  const insight = useMemo(() => {
    if (energy >= 4 && connection >= 4 && pressure <= 2) {
      return "You're in a high-flow state! Your connection and energy are peaking.";
    }
    if (pressure >= 4) {
      return "You're feeling quite a bit of pressure. Try a short nudge.";
    }
    return "Your levels are balanced. Let's keep this momentum going.";
  }, [energy, pressure, connection]);

  const toggleNudge = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsNudgeExpanded(!isNudgeExpanded);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.settingsBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notifBtn}
          activeOpacity={0.7}
          onPress={() => setShowNotifs(true)}
        >
          <Ionicons name="notifications-outline" size={26} color={Colors.textPrimary} />
          <View style={[styles.notifBadge, { backgroundColor: Colors.primary }]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header Section ── */}
        <View style={[
          styles.header,
          { backgroundColor: Colors.primary }
        ]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greetingText, { color: '#FFFFFF' }]}>{greeting}</Text>
              <Text style={[styles.dateText, { color: 'rgba(255,255,255,0.85)' }]}>{subGreeting}</Text>
            </View>
            <View style={styles.stickerHeaderPos}>
              <GenderSticker gender={(user.gender as any) || 'other'} size={100} />
              <View style={styles.inlineDayChip}>
                <View style={styles.dayDot} />
                <Text style={styles.dayChipText}>Day {daysActive}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Question ── */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>How are you doing?</Text>
        </View>

        {/* ── Mental State Levels ── */}
        <View style={styles.levelsCard}>
          <View style={styles.levelsRow}>
            <VerticalLevel label="Energy" value={energy} onChange={setEnergy} activeColor="#A7F3D0" />
            <VerticalLevel label="Pressure" value={pressure} onChange={setPressure} activeColor={Colors.accent} />
            <VerticalLevel label="Connection" value={connection} onChange={setConnection} activeColor="#C7D2FE" />
          </View>
        </View>

        {/* ── Today's Nudge ── */}
        <View style={styles.nudgeSection}>
          <Text style={styles.sectionLabel}>TODAY'S NUDGE</Text>
          <TouchableOpacity
            style={styles.nudgePromoCard}
            onPress={toggleNudge}
            activeOpacity={0.9}
          >
            <View style={styles.nudgeRow}>
              <Text style={styles.nudgeIcon}>{todaysNudge.icon}</Text>
              <View style={styles.nudgeInfo}>
                <Text style={styles.nudgeTitle}>{todaysNudge.title}</Text>
                <Text style={styles.nudgeSubtitle}>{todaysNudge.duration}</Text>
              </View>
              <Ionicons
                name={isNudgeExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#9CA3AF"
              />
            </View>

            {isNudgeExpanded && (
              <View style={styles.nudgeActions}>
                <TouchableOpacity
                  style={styles.nudgeActionButton}
                  onPress={() => navigation.navigate('Nudge')}
                >
                  <Text style={styles.nudgeActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nudgeActionButton}
                  onPress={toggleNudge}
                >
                  <Text style={styles.nudgeActionText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Instant Insight ── */}
        <View style={[styles.insightCard, { backgroundColor: Colors.silver, borderLeftColor: Colors.primary }]}>
          <Text style={[styles.insightTitle, { color: Colors.primary }]}>Instant Insight</Text>
          <Text style={styles.insightText}>{insight}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made Mindfully in 🇳🇵
          </Text>
          <Text style={styles.footerBranding}>
            Clear Mind
          </Text>
          <Text style={styles.footerBranding}>
            Better Performance
          </Text>
        </View>
      </ScrollView>

      {/* ── Notifications Modal ── */}
      <Modal visible={showNotifs} transparent animationType="fade" statusBarTranslucent>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowNotifs(false)}>
          <View style={styles.notifCard}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifs(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.notifItem}>
              <View style={[styles.notifDot, { backgroundColor: Colors.primary }]} />
              <View>
                <Text style={styles.notifItemTitle}>Welcome back, {user.name}!</Text>
                <Text style={styles.notifItemSub}>Time for a quick emotion check-in.</Text>
              </View>
            </View>
            <View style={styles.notifItem}>
              <View style={[styles.notifDot, { backgroundColor: '#E5E7EB' }]} />
              <View>
                <Text style={styles.notifItemTitle}>Goal Update</Text>
                <Text style={styles.notifItemSub}>Keep reflecting to reach your goals.</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  notifBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary, // Primary branding (will be dynamic)
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.md,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '400',
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'SnellRoundhand-Bold' : 'serif',
    letterSpacing: -0.5,
  },
  dateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif-light',
  },
  stickerHeaderPos: {
    marginTop: -10,
    marginRight: -10,
    alignItems: 'center',
  },
  inlineDayChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: -8,
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  questionContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  questionText: {
    ...Typography.question,
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  levelsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    ...Shadows.sm,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F8FAFB',
  },
  levelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    transform: [{ scale: 0.85 }], // Scale down the levels for smaller look
  },
  nudgeSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  nudgePromoCard: {
    backgroundColor: Colors.silver,
    borderRadius: 24,
    padding: 20,
    ...Shadows.md,
  },
  nudgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  nudgeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  nudgeInfo: {
    flex: 1,
  },
  nudgeTitle: {
    ...Typography.bodyMedium,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  nudgeSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  nudgeActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  nudgeActionButton: {
    flex: 1,
    backgroundColor: Colors.silver,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  nudgeActionText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  insightCard: {
    backgroundColor: Colors.beige, // Refined to Beige
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  insightTitle: {
    fontSize: 12,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    fontWeight: '800',
  },
  insightText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notifCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    ...Shadows.lg,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notifTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  notifItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7061F0',
  },
  notifItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifItemSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 0,
    paddingHorizontal: Spacing.lg,
  },
  footerText: {
    ...Typography.captionMedium,
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  footerBranding: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontWeight: '800',
    lineHeight: 32,
    textAlign: 'left',
    opacity: 0.85,
  },
});
