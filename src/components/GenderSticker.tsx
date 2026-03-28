import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { BlinkingEyes } from './BlinkingEyes';
import { Colors, Shadows } from '../theme/theme';

interface GenderStickerProps {
  gender: 'female' | 'male' | 'other' | '';
  size?: number;
}

export const GenderSticker: React.FC<GenderStickerProps> = ({ 
  gender, 
  size = 120 
}) => {
  const headSize = size * 0.75;
  const hairColor = gender === 'female' ? '#634732' : gender === 'male' ? '#2D3748' : '#718096';
  const shirtColor = gender === 'female' ? '#FF8787' : gender === 'male' ? '#74C0FC' : '#63E6BE';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Hair/Ears (Back) */}
      <View style={[
        styles.hairBack, 
        { 
          backgroundColor: hairColor, 
          width: headSize * 1.05, 
          height: headSize * 1.05,
          borderRadius: headSize * 0.5,
          top: 0
        }
      ]} />
      
      {/* Small cute ears for animal feel */}
      <View style={[styles.ear, { left: headSize * 0.1, backgroundColor: hairColor }]} />
      <View style={[styles.ear, { right: headSize * 0.1, backgroundColor: hairColor }]} />

      {/* Head */}
      <View style={[
        styles.head, 
        { 
          width: headSize, 
          height: headSize, 
          borderRadius: headSize * 0.45,
          top: size * 0.1
        }
      ]}>
        {/* Face Content */}
        <View style={styles.faceContent}>
          {/* Blushing cheeks (Only 1 set) */}
          <View style={[styles.blush, { left: headSize * 0.1, bottom: headSize * 0.25 }]} />
          <View style={[styles.blush, { right: headSize * 0.1, bottom: headSize * 0.25 }]} />
          
          {/* Eyes */}
          <View style={styles.eyeWrap}>
            <BlinkingEyes size={headSize * 0.14} gap={headSize * 0.35} color="#1F2937" interval={4500} />
          </View>
          
          {/* Mouth (Only 1) */}
          <View style={styles.mouthWrap}>
             <View style={styles.mouthDot} />
          </View>
        </View>
      </View>

      {/* Body/Shirt */}
      <View style={[
        styles.shirt, 
        { 
          backgroundColor: shirtColor, 
          width: size * 0.85, 
          height: size * 0.45, 
          borderRadius: size * 0.2,
          bottom: 0
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  hairBack: {
    position: 'absolute',
  },
  ear: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 8,
    top: -5,
    transform: [{ rotate: '45deg' }],
  },
  head: {
    backgroundColor: '#FFE8DE',
    position: 'absolute',
    ...Shadows.sm,
    overflow: 'hidden',
  },
  faceContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeWrap: {
    marginTop: -10,
  },
  blush: {
    width: 22,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 123, 123, 0.25)',
    position: 'absolute',
  },
  mouthWrap: {
    marginTop: 6,
    alignItems: 'center',
  },
  mouthDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1F2937',
    opacity: 0.8,
  },
  shirt: {
    position: 'absolute',
    zIndex: -1,
  },
});

