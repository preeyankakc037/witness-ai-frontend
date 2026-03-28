import React, { createContext, useContext, useState, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  options?: string[];
  prompts?: string[];
};

export type User = {
  name: string;
  email: string;
  wakeTime: string;
  sleepTime: string;
  remindersEnabled: boolean;
  isGuest: boolean;
  gender: 'female' | 'male' | 'other' | '';
  createdAt: number | null;
  goals: string[];
  setupComplete: boolean;
};

type AppContextType = {
  user: User;
  setUser: (user: User) => void;
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (val: boolean) => void;
};

// ─── Initial State ────────────────────────────────────────────────────────────

const defaultUser: User = {
  name: '',
  email: '',
  wakeTime: '08:00 AM',
  sleepTime: '09:30 PM',
  remindersEnabled: true,
  isGuest: true,
  gender: '',
  createdAt: null,
  goals: [],
  setupComplete: false,
};

const initialMessages: Message[] = [
  {
    id: 'ai-1',
    text: 'How are you feeling today?',
    sender: 'ai',
    timestamp: new Date(),
    options: ['Happy', 'Anxious', 'Sad', 'Calm'],
    prompts: ['Why do I feel this way?', 'What should I do next?'],
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const clearMessages = () => {
    setMessages(initialMessages);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        selectedMood,
        setSelectedMood,
        messages,
        addMessage,
        clearMessages,
        onboardingComplete,
        setOnboardingComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
