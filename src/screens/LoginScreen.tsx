import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

const { width } = Dimensions.get('window');

export const LoginScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        {/* Floating Planet Graphic */}
        <View style={styles.graphicContainer}>
          {/* Main glowing planet */}
          <View style={styles.planetOuterGlow}>
            <View style={styles.planet} />
          </View>

          {/* Saturn-like ring (simplified using a tilted ellipse) */}
          <View style={styles.ringFront} />

          {/* Tiny floating mood blobs (simulated natively with colored circles) */}
          <View style={[styles.microBlob, { top: -20, left: '20%', backgroundColor: '#DADAFA', width: 30, height: 20, borderRadius: 10 }]} />
          <View style={[styles.microBlob, { top: '30%', right: '10%', backgroundColor: '#FFD166', width: 20, height: 20, borderRadius: 10 }]} />
          <View style={[styles.microBlob, { bottom: '20%', left: '15%', backgroundColor: '#6A5ACD', width: 25, height: 20, borderRadius: 10 }]} />
          <View style={[styles.microBlob, { bottom: '15%', right: '25%', backgroundColor: '#FF9F89', width: 20, height: 16, borderRadius: 8 }]} />
          <View style={[styles.microBlob, { top: '40%', left: '25%', backgroundColor: '#FF9F89', width: 14, height: 14, borderRadius: 7 }]} />

          {/* Little spark stars (+) */}
          <Text style={[styles.spark, { top: 0, right: '30%' }]}>✨</Text>
          <Text style={[styles.spark, { bottom: '30%', left: '5%' }]}>✨</Text>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Discover your mood insights</Text>
          <Text style={styles.subtitle}>
            We're here to help you track, analyze, and improve your emotional health every step of the way.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F1F1', // Soft peach/warm white gradient backdrop
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  graphicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 40,
  },
  planetOuterGlow: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#FFE6DF', // soft coral glow
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF9F89',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  planet: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: width * 0.275,
    backgroundColor: '#FCE3D8',
  },
  ringFront: {
    position: 'absolute',
    width: width * 0.9,
    height: 30,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#FAD8C3',
    transform: [{ rotate: '-15deg' }],
    top: '48%',
    zIndex: 2,
    borderTopColor: 'transparent',
    borderRightColor: '#FAD8C3',
    borderLeftColor: '#FAD8C3',
    borderBottomColor: '#F5CCA8',
  },
  microBlob: {
    position: 'absolute',
    opacity: 0.9,
    zIndex: 3,
  },
  spark: {
    position: 'absolute',
    fontSize: 16,
    opacity: 0.6,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: Colors.primary, 
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    ...Shadows.purple,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
  },
});
