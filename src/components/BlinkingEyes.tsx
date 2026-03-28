import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface BlinkingEyesProps {
  size?: number;
  color?: string;
  interval?: number; // blink every X ms
  gap?: number;
}

export const BlinkingEyes: React.FC<BlinkingEyesProps> = ({ 
  size = 6, 
  color = '#1F2937', 
  interval = 4000,
  gap = 12
}) => {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const timer = setInterval(() => {
      blink();
    }, interval);

    return () => clearInterval(timer);
  }, [blinkAnim, interval]);

  const eyeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    transform: [{ scaleY: blinkAnim }],
  };

  return (
    <View style={[styles.container, { gap }]}>
      <Animated.View style={eyeStyle} />
      <Animated.View style={eyeStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
