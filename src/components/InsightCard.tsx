import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface InsightCardProps {
  iconName?: IconName;
  iconColor?: string;
  text: string;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning';
}

export const InsightCard: React.FC<InsightCardProps> = ({
  iconName = 'bulb-outline',
  iconColor,
  text,
  subtext,
  variant = 'default',
}) => {
  const bgColor =
    variant === 'success'
      ? Colors.primaryLight
      : variant === 'warning'
      ? '#FFF8E6'
      : Colors.card;

  const borderColor =
    variant === 'success'
      ? '#C2E8DC'
      : variant === 'warning'
      ? '#FDEABF'
      : Colors.border;

  const defaultIconColor = 
    variant === 'success'
      ? Colors.primary
      : variant === 'warning'
      ? Colors.warning
      : Colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
      <Ionicons 
        name={iconName} 
        size={26} 
        color={iconColor || defaultIconColor} 
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    ...Shadows.sm,
    marginBottom: Spacing.md,
  },
  icon: {
    marginRight: Spacing.md,
  },
  textContainer: { flex: 1 },
  text: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtext: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
