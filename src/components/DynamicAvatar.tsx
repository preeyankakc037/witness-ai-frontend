import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlinkingEyes } from './BlinkingEyes';
import { Colors, Radius, Typography, Shadows } from '../theme/theme';

interface DynamicAvatarProps {
  gender: 'female' | 'male' | 'other';
  size?: number;
  label?: string;
}

export const DynamicAvatar: React.FC<DynamicAvatarProps> = ({ 
  gender, 
  size = 48, 
  label = 'S' 
}) => {
  const bgColor = gender === 'female' ? '#A7F3D0' : gender === 'male' ? '#C7D2FE' : '#E5E7EB';
  
  return (
    <View style={[
      styles.avatar, 
      { 
        width: size, 
        height: size, 
        borderRadius: size / 2, 
        backgroundColor: bgColor 
      }
    ]}>
      {/* Eyes */}
      <View style={styles.eyeContainer}>
        <BlinkingEyes size={size * 0.12} gap={size * 0.25} color="#1F2937" />
      </View>
      
      {/* Name Initial Label */}
      <Text style={[styles.label, { fontSize: size * 0.28 }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Shadows.sm,
  },
  eyeContainer: {
    marginTop: -2,
    marginBottom: 2,
  },
  label: {
    ...Typography.tiny,
    color: '#1F2937',
    fontWeight: '800',
    opacity: 0.6,
  },
});
