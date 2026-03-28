import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Shadows } from '../theme/theme';

interface VoiceButtonProps {
  onPress: () => void;
  isListening: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onPress, isListening }) => {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      const anim1 = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse1, { toValue: 1.4, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse1, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      );
      const anim2 = Animated.loop(
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(pulse2, { toValue: 1.7, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse2, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      );
      anim1.start();
      anim2.start();
      return () => {
        anim1.stop();
        anim2.stop();
        pulse1.setValue(1);
        pulse2.setValue(1);
      };
    }
  }, [isListening]);

  return (
    <View style={styles.wrapper}>
      {isListening && (
        <>
          <Animated.View style={[styles.ring, styles.ring2, { transform: [{ scale: pulse2 }] }]} />
          <Animated.View style={[styles.ring, styles.ring1, { transform: [{ scale: pulse1 }] }]} />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
        <Text style={styles.icon}>{isListening ? '⏹' : '🎙️'}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>{isListening ? 'Tap to stop' : 'Tap to speak'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
  },
  ring1: {
    width: 72,
    height: 72,
    borderColor: `${Colors.primary}55`,
  },
  ring2: {
    width: 90,
    height: 90,
    borderColor: `${Colors.primary}30`,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.green,
  },
  icon: { fontSize: 26 },
  label: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
