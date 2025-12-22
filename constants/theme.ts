export const COLORS = {
  primary: '#14B8A6',
  primaryDark: '#0D9488',
  secondary: '#F97316',
  secondaryDark: '#EA580C',

  brand: {
    green: '#10B981',
    greenDark: '#059669',
    blue: '#3B82F6',
    blueDark: '#2563EB',
  },

  background: '#000000',
  backgroundSecondary: '#0A1F1C',
  card: '#1E2837',
  cardDark: '#1A2F2A',
  cardLight: '#2A3441',

  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',

  border: '#374151',
  borderLight: '#1E293B',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  gradient: {
    primary: ['#14B8A6', '#0D9488'],
    secondary: ['#F97316', '#EA580C'],
    purple: ['#7C3AED', '#6D28D9'],
    blue: ['#3B82F6', '#2563EB'],
    green: ['#10B981', '#059669'],
    brandHome: ['#0D9488', '#064E3B'],
    brandSearch: ['#3B82F6', '#1E3A8A'],
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 13,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
