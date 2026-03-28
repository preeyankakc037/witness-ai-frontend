// ─── Witness AI — Design System ──────────────────────────────────────────────
// Single source of truth for all colors, typography, spacing, and shadows.
import { Platform } from 'react-native';

export const Palette = {
  beige: '#F3F4F6', // Very Light Silver
  silver: '#F3F4F6',
  green: '#ECFBF1',
  blue: '#EFF1FB',
  pink: '#FFF5F5',
};

export const Colors = {
  // Primary purple palette (Brand)
  primary: '#7B6CF6',
  primaryLight: Palette.pink, // Soft pink/purple base
  primaryDark: '#5A4EE0',

  // Accent Colors from Palette
  beige: Palette.beige,
  silver: Palette.silver,
  softGreen: Palette.green,
  softBlue: Palette.blue,
  softPink: Palette.pink,

  // Accent Orange (Tertiary)
  accent: '#FF7A00',
  accentLight: '#FFF4EB',

  // Backgrounds
  background: '#FDFCFB', // Clean, off-white background
  card: '#FFFFFF',
  surface: '#F8F9FA',

  // Text
  textPrimary: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Misc
  border: '#E5E7EB',
  inputBg: '#F3F4F6',
  overlay: 'rgba(0,0,0,0.4)',
  shadow: '#1F2937',
};

export const Typography = {
  heroTitle: { fontSize: 34, fontWeight: '800' as const, letterSpacing: -0.5 },
  title: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.3 },
  heading: { fontSize: 20, fontWeight: '700' as const },
  subheading: { fontSize: 17, fontWeight: '600' as const },
  question: { 
    fontSize: 22, 
    fontWeight: '400' as const, 
    letterSpacing: 0.2,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'sans-serif-medium' 
  },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  bodyMedium: { fontSize: 15, fontWeight: '500' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  captionMedium: { fontSize: 13, fontWeight: '500' as const },
  tiny: { fontSize: 11, fontWeight: '400' as const },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 10,
  md: 18,
  lg: 20,
  xl: 24,
  full: 999,
};

export const Shadows = {
  sm: {
    shadowColor: '#7B6CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  },
  lg: {
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  purple: {
    shadowColor: '#7B6CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  orange: {
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 10,
  },
};
