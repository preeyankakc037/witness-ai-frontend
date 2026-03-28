import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import { TodayScreen } from '../screens/TodayScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { NudgeScreen } from '../screens/NudgeScreen';
import { ActionModal } from '../components/ActionModal';
import { Colors, Typography, Shadows } from '../theme/theme';

const Tab = createBottomTabNavigator();
const DummyScreen = () => null;

// Config for each tab: maps name → Ionicons icon names
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: Record<string, { active: IoniconName; inactive: IoniconName; label: string }> = {
  Home:    { active: 'home',         inactive: 'home-outline',         label: 'Home'    },
  Journey: { active: 'trending-up',  inactive: 'trending-up-outline',  label: 'Journey' },
  Nudge:   { active: 'flash',        inactive: 'flash-outline',        label: 'Nudge'   },
  Mindy:   { active: 'chatbubbles',  inactive: 'chatbubbles-outline',  label: 'Mindy'   },
};

export const TabNavigator = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleActionSelect = () => {
    navigation.navigate('Chat');
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const cfg = TAB_CONFIG[route.name];
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: [
              styles.tabBar,
              { 
                height: (Platform.OS === 'ios' ? 70 : 64) + insets.bottom,
                paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 12,
              }
            ],
            tabBarIcon: ({ focused, color }) => {
              if (!cfg) return null;
              return (
                <View style={focused ? styles.activeTab : styles.inactiveTab}>
                  <Ionicons
                    name={focused ? cfg.active : cfg.inactive}
                    size={focused ? 28 : 24}
                    color={color}
                  />
                  {focused && (
                    <Text style={styles.tabLabel}>{cfg.label}</Text>
                  )}
                </View>
              );
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={TodayScreen} />
        
        <Tab.Screen name="Mindy" component={ChatScreen} />

        {/* Center floating + button */}
        <Tab.Screen
          name="Add"
          component={DummyScreen}
          options={{
            tabBarButton: (props: any) => (
              <TouchableOpacity
                {...props}
                style={styles.centerBtnWrap}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.88}
              >
                <View style={styles.centerBtn}>
                  <Ionicons name="add" size={32} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen name="Nudge" component={NudgeScreen} />

        <Tab.Screen name="Journey" component={AnalysisScreen} />
      </Tab.Navigator>

      <ActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleActionSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 8,
    ...Shadows.md,
  },
  activeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    gap: 2,
  },
  inactiveTab: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    ...Typography.captionMedium,
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  centerBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -12,
    width: 64,
  },
  centerBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
