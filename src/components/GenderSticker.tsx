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
  const contentSize = size * 0.85;
  const bgColor = gender === 'female' ? '#FEE2E2' : gender === 'male' ? '#DBEAFE' : '#ECFDF5';
  const accentColor = gender === 'female' ? '#F87171' : gender === 'male' ? '#60A5FA' : '#34D399';
  const earColor = gender === 'female' ? '#FDA4AF' : gender === 'male' ? '#93C5FD' : '#6EE7B7';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Character Base (Bubble style) */}
      <View style={[
        styles.characterBody, 
        { 
          width: contentSize, 
          height: contentSize, 
          borderRadius: contentSize * 0.45,
          backgroundColor: bgColor,
        }
      ]}>
        {/* Ears integrated better */}
        <View style={[styles.ear, { left: '15%', top: '-8%', backgroundColor: earColor }]} />
        <View style={[styles.ear, { right: '15%', top: '-8%', backgroundColor: earColor }]} />

        {/* Blush */}
        <View style={[styles.blush, { left: '18%', bottom: '30%', backgroundColor: accentColor }]} />
        <View style={[styles.blush, { right: '18%', bottom: '30%', backgroundColor: accentColor }]} />

        {/* Eyes & Mouth Container */}
        <View style={styles.faceContainer}>
          <BlinkingEyes size={contentSize * 0.12} gap={contentSize * 0.28} color="#2D3748" interval={3500} />
          <View style={styles.mouth} />
        </View>
      </View>
      
      {/* Soft Shadow under the character */}
      <View style={[styles.bottomShadow, { width: contentSize * 0.7 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterBody: {
    ...Shadows.md,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ear: {
    position: 'absolute',
    width: '25%',
    height: '25%',
    borderRadius: 12,
  },
  faceContainer: {
    alignItems: 'center',
    marginTop: -4,
  },
  blush: {
    position: 'absolute',
    width: '18%',
    height: '8%',
    borderRadius: 8,
    opacity: 0.2,
  },
  mouth: {
    width: 6,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#2D3748',
    marginTop: 8,
    opacity: 0.6,
  },
  bottomShadow: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    marginTop: 12,
  },
});

