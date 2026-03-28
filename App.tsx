import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { TabNavigator } from './src/navigation/TabNavigator';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { OnboardingModal } from './src/components/OnboardingModal';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { onboardingComplete, setOnboardingComplete, setUser, user } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Onboarding modal floats above everything on first launch */}
      <OnboardingModal
        visible={!onboardingComplete}
        onGuest={() => {
          setUser({ ...user, isGuest: true });
          setOnboardingComplete(true);
        }}
        onLogin={() => {
          setOnboardingComplete(true);
        }}
      />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}
