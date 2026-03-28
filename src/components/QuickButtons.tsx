import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface QuickButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const QuickButtons: React.FC<QuickButtonsProps> = ({ options, onSelect }) => {
  if (!options || options.length === 0) return null;

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#6A5ACD',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonPressed: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
  },
  buttonText: {
    color: '#6A5ACD',
    fontWeight: '600',
    fontSize: 14,
  },
});
