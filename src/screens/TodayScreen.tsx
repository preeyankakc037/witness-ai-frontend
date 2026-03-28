import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, Modal } from 'react-native';
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

export const TodayScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [showNotifs, setShowNotifs] = useState(false);
  
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

  // Smarter Insight Logic
  const insight = useMemo(() => {
     if (energy >= 4 && connection >= 4 && pressure <= 2) {
       return "You're in a high-flow state! Your connection and energy are peaking. Perfect time for deep work.";
     }
     if (pressure >= 4) {
       return "You're feeling quite a bit of pressure. Take a 5-minute breather or try a short meditation with Mindy.";
     }
     if (connection <= 2) {
       return "Feeling a bit disconnected? Reaching out to a friend or journaling might help lift your levels.";
     }
     if (energy <= 2 && pressure <= 2) {
       return "Low energy but calm. This is a great state for light reading or resting without guilt.";
     }
     return "Your levels are balanced. It's a stable time to fill your emotions levels and stay present.";
  }, [energy, pressure, connection]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <DynamicAvatar gender={user.gender} size={44} label={user.name ? user.name[0].toUpperCase() : 'S'} />
        <TouchableOpacity 
          style={styles.notifBtn} 
          activeOpacity={0.7}
          onPress={() => setShowNotifs(true)}
        >
          <Ionicons name="notifications-outline" size={26} color={Colors.textPrimary} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header Section ── */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.dateText}>{subGreeting}</Text>
          
          <View style={styles.dayChip}>
            <Text style={styles.dayChipText}>Day {daysActive}</Text>
          </View>
        </View>

        {/* ── Sticker & Question ── */}
        <View style={styles.stickerContainer}>
          <View style={styles.stickerPos}>
            <GenderSticker gender={user.gender} size={130} />
          </View>
          <Text style={styles.questionText}>How are you doing?</Text>
        </View>

        {/* ── Mental State Levels ── */}
        <View style={styles.levelsCard}>
          <View style={styles.levelsRow}>
            <VerticalLevel label="Energy" value={energy} onChange={setEnergy} activeColor="#A7F3D0" />
            <VerticalLevel label="Pressure" value={pressure} onChange={setPressure} activeColor="#FECACA" />
            <VerticalLevel label="Connection" value={connection} onChange={setConnection} activeColor="#C7D2FE" />
          </View>
        </View>

        {/* ── Instant Insight ── */}
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Instant Insight</Text>
          <Text style={styles.insightText}>{insight}</Text>
        </View>

        <MindyCard onPress={() => navigation.navigate('Chat')} />
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
              <View style={styles.notifDot} />
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
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7061F0',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '800', // Thicker
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.5,
  },
  dateText: {
    fontSize: 15,
    color: Spacing.lg ? Colors.textSecondary : '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  dayChip: {
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stickerContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  stickerPos: {
    position: 'absolute',
    right: 24,
    top: -40,
    zIndex: 1,
  },
  questionText: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 24,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  levelsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    ...Shadows.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#F8FAFB',
  },
  levelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.md,
    borderLeftWidth: 4,
    borderLeftColor: '#7061F0',
  },
  insightTitle: {
    fontSize: 12,
    color: '#7061F0',
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
});
