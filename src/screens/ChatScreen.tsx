import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  FlatList, TouchableOpacity, Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { ChatBubble } from '../components/ChatBubble';
import { InputBar } from '../components/InputBar';
import { useApp, Message } from '../context/AppContext';

const AI_RESPONSES = [
  { text: "Did you avoid something important today?", options: ['Yes', 'No'] },
  { text: "What do you think triggered that feeling?", options: ['Work stress', 'People', 'Unsure'], prompts: ['What pattern do you see?'] },
  { text: "That makes sense. Would you say things are getting better or staying the same?", options: ['Better', 'Same', 'Worse'] },
  { text: "I hear you. You're doing well by reflecting on this. What's one small thing that could help today?", prompts: ['What should I do next?', 'How do I cope?'] },
];

export const ChatScreen = ({ route, navigation }: any) => {
  const { messages, addMessage } = useApp();
  const [isListening, setIsListening] = useState(route?.params?.startListening ?? false);
  const [responseIndex, setResponseIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Pulse animation for "AI is typing"
  const typingOpacity = useRef(new Animated.Value(0)).current;
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(typingOpacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      typingOpacity.setValue(0);
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setIsListening(false);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const idx = responseIndex % AI_RESPONSES.length;
      const response = AI_RESPONSES[idx];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'ai',
        timestamp: new Date(),
        options: response.options,
        prompts: response.prompts,
      };
      addMessage(aiMsg);
      setResponseIndex((prev) => prev + 1);
    }, 1400);
  };

  const handleMicPress = () => {
    setIsListening((prev: boolean) => !prev);
    if (isListening) {
      // Simulate voice input completing
      setTimeout(() => handleSend("I've been feeling a bit overwhelmed lately."), 500);
    }
  };

  // Get smart prompts from last AI message
  const lastAIMsg = [...messages].reverse().find((m) => m.sender === 'ai');
  const activePrompts = lastAIMsg?.prompts ?? [];
  const activeOptions = lastAIMsg?.options;

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
             <Ionicons name="sparkles-outline" size={20} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Mindy</Text>
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Chat Area */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={styles.chatContent}
        ListHeaderComponent={
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>Today</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const isLastAI = item.sender === 'ai' && index === messages.length - 1;
          return (
            <View>
              <ChatBubble text={item.text} sender={item.sender} />
              {/* Quick reply options under last AI message */}
              {isLastAI && item.options && (
                <View style={styles.optionsRow}>
                  {item.options.map((opt: string) => (
                    <TouchableOpacity
                      key={opt}
                      style={styles.optionChip}
                      onPress={() => handleSend(opt)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        }}
        ListFooterComponent={
          isTyping ? (
            <View style={styles.typingRow}>
              <View style={styles.typingAvatar}>
                <Ionicons name="chatbubbles" size={12} color={Colors.primary} />
              </View>
              <Animated.View style={[styles.typingBubble, { opacity: typingOpacity }]}>
                <Text style={styles.typingDots}>● ● ●</Text>
              </Animated.View>
            </View>
          ) : null
        }
      />

      {/* Input */}
      <InputBar
        onSend={handleSend}
        onMicPress={handleMicPress}
        isListening={isListening}
        smartPrompts={activePrompts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  headerTitle: { ...Typography.subheading, color: Colors.textPrimary, marginBottom: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineIndicator: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.success,
  },
  statusText: { ...Typography.tiny, color: Colors.textSecondary },
  callBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  chatContent: {
    paddingVertical: Spacing.md,
    paddingBottom: 20,
    flexGrow: 1,
  },
  datePill: {
    alignSelf: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
  },
  datePillText: { ...Typography.captionMedium, color: Colors.textSecondary },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: Spacing.md,
    paddingLeft: 56, // aligned after avatar
    marginTop: 4,
    marginBottom: 8,
  },
  optionChip: {
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    ...Shadows.sm,
  },
  optionText: { ...Typography.captionMedium, color: Colors.primary },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    marginTop: 8,
  },
  typingAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  typingBubble: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Shadows.sm,
  },
  typingDots: { color: Colors.textMuted, fontSize: 12, letterSpacing: 2 },
});
