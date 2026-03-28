import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Colors, Typography, Radius, Spacing, Shadows } from '../theme/theme';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const GOALS = [
  "Understand my emotions",
  "Reduce daily stress",
  "Build a reflection habit",
  "Track my energy levels",
  "Mental clarity",
];

interface OnboardingModalProps {
  visible: boolean;
  onGuest?: () => void;
  onLogin?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ visible, onGuest, onLogin }) => {
  const { setUser, user, setOnboardingComplete } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<any>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalize
      setUser({
        ...user,
        name: name || 'Friend',
        gender: gender || 'other',
        goals: selectedGoals,
        createdAt: Date.now(),
        setupComplete: true,
      });
      setOnboardingComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.title}>What should we{'\n'}call you?</Text>
            <Text style={styles.subtitle}>It's nice to meet you. Let's start with your name.</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.title}>Select your{'\n'}gender</Text>
            <Text style={styles.subtitle}>This helps us personalize your experience and character.</Text>
            <View style={styles.optionsRow}>
              {['female', 'male', 'other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.optionBtn, gender === g && styles.selectedOption]}
                  onPress={() => setGender(g)}
                >
                  <Text style={[styles.optionText, gender === g && styles.selectedOptionText]}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.title}>What brings you{'\n'}here?</Text>
            <Text style={styles.subtitle}>Select the goals you'd like to focus on.</Text>
            <ScrollView style={styles.goalsList} showsVerticalScrollIndicator={false}>
              {GOALS.map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[styles.goalItem, selectedGoals.includes(goal) && styles.selectedGoal]}
                  onPress={() => toggleGoal(goal)}
                >
                  <Text style={[styles.goalText, selectedGoals.includes(goal) && styles.selectedGoalText]}>
                    {goal}
                  </Text>
                  {selectedGoals.includes(goal) && (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = (step === 1 && !name.trim()) || (step === 2 && !gender);

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.card}>
          {/* Header with Back Button */}
          <View style={styles.header}>
            {step > 1 && (
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.progressBar}>
              {[1, 2, 3].map(i => (
                <View key={i} style={[styles.progressDot, step >= i && { backgroundColor: Colors.primary }]} />
              ))}
            </View>
            {step > 1 && <View style={{ width: 24 }} />}
          </View>

          {renderStep()}

          <TouchableOpacity 
            style={[styles.nextBtn, isNextDisabled && { opacity: 0.5 }]} 
            onPress={handleNext}
            disabled={isNextDisabled}
          >
            <Text style={styles.nextBtnText}>{step === 3 ? "Get Started" : "Continue"}</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>Step {step} of 3</Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 32,
    paddingBottom: 48,
    width: '100%',
    ...Shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backBtn: {
    padding: 4,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flex: 1,
  },
  progressDot: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
  },
  stepContent: {
    minHeight: 280,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    lineHeight: 34,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    fontSize: 18,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedOption: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  goalsList: {
    maxHeight: 220,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedGoal: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  goalText: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  selectedGoalText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
    marginTop: 24,
    ...Shadows.md,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  disclaimer: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 16,
    fontSize: 14,
  },
});
