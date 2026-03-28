import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';

interface InputBarProps {
  onSend: (text: string) => void;
  onMicPress: () => void;
  isListening: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({
  onSend,
  onMicPress,
  isListening,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        {/* Listening State */}
        {isListening ? (
          <View style={styles.listeningBar}>
            <View style={styles.listeningLeft}>
              <ActivityIndicator color={Colors.primary} size="small" />
              <Text style={styles.listeningText}>Listening...</Text>
            </View>
            <TouchableOpacity style={styles.stopBtn} onPress={onMicPress}>
              <Text style={styles.stopText}>Stop</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Normal Input Row */
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.micBtn} onPress={onMicPress}>
              <Ionicons name="mic" size={22} color={Colors.primary} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Say something..."
              placeholderTextColor={Colors.textMuted}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && styles.sendBtnDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Ionicons name="arrow-up" size={20} color={Colors.textOnPrimary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  promptsContainer: {
    paddingBottom: Spacing.sm,
    gap: 8,
  },
  promptChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C2E8DC',
  },
  promptText: {
    ...Typography.captionMedium,
    color: Colors.primaryDark,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    ...Shadows.md,
  },
  micBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: { fontSize: 20 },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    maxHeight: 100,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.purple,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  sendIcon: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  listeningBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  listeningLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  listeningText: {
    ...Typography.bodyMedium,
    color: Colors.primary,
    marginLeft: 10,
  },
  stopBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  stopText: {
    color: Colors.textOnPrimary,
    ...Typography.captionMedium,
  },
});
