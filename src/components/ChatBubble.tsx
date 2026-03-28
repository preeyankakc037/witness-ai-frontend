import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';

interface ChatBubbleProps {
  text: string;
  sender: 'user' | 'ai';
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender }) => {
  const isUser = sender === 'user';
  const { user } = useApp();
  const themeBg = user.gender === 'female' ? Colors.softPink : user.gender === 'male' ? Colors.softBlue : Colors.softGreen;
  const themeText = user.gender === 'female' ? '#EC4899' : user.gender === 'male' ? '#6366F1' : '#10B981';
  const themeAccent = user.gender === 'female' ? '#F9A8D4' : user.gender === 'male' ? '#A5B4FC' : '#A7F3D0';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAI]}>
      {!isUser && (
        <View style={[styles.avatar, { backgroundColor: themeBg, borderColor: themeAccent }]}>
          <Text style={[styles.avatarText, { color: themeText }]}>M</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? { backgroundColor: themeText, ...Shadows.sm } : styles.bubbleAI]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAI]}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAI: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginBottom: 2,
  },
  avatarText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radius.lg,
  },
  bubbleAI: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: Radius.sm,
    ...Shadows.sm,
  },
  text: {
    ...Typography.body,
  },
  textUser: {
    color: Colors.textOnPrimary,
  },
  textAI: {
    color: Colors.textPrimary,
  },
});
