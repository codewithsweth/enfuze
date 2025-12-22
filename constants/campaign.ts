import { Rocket, Target, Calendar, Bell, Camera, Gift } from 'lucide-react-native';

export const CAMPAIGN_TEMPLATES = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Perfect for new product announcements and launches',
    icon: Rocket,
    color: '#7C3AED',
  },
  {
    id: 'brand-awareness',
    name: 'Brand Awareness',
    description: 'Build your brand presence and visibility',
    icon: Target,
    color: '#3B82F6',
  },
  {
    id: 'event-promotion',
    name: 'Event Promotion',
    description: 'Promote your upcoming events effectively',
    icon: Calendar,
    color: '#F97316',
  },
  {
    id: 'seasonal-campaign',
    name: 'Seasonal Campaign',
    description: 'Holiday and seasonal content campaigns',
    icon: Bell,
    color: '#10B981',
  },
  {
    id: 'ugc-content',
    name: 'UGC Content',
    description: 'User-generated content and community posts',
    icon: Camera,
    color: '#EC4899',
  },
  {
    id: 'giveaway',
    name: 'Giveaway',
    description: 'Run contests and giveaways to boost engagement',
    icon: Gift,
    color: '#F59E0B',
  },
] as const;

export const CATEGORIES = [
  'Fashion',
  'Beauty',
  'Technology',
  'Food',
  'Travel',
  'Fitness',
  'Gaming',
  'Lifestyle',
  'Finance',
  'Education',
  'Health',
  'Entertainment',
  'Sports',
  'Automobile',
] as const;

export const AGE_GROUPS = [
  { id: '6mo-3yr', label: '6mo - 3yr' },
  { id: '3-10yr', label: '3 - 10 Yr' },
  { id: '11-18yr', label: '11 - 18 Yr' },
  { id: '19-30yr', label: '19 - 30 Yr' },
  { id: '31-45yr', label: '31 - 45 Yr' },
  { id: '46-60yr', label: '46 - 60 Yr' },
] as const;

export const GENDERS = [
  { id: 'all', label: 'All' },
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
] as const;

export const BUDGET_RANGES = [
  { id: '25k-50k', label: '₹25K - 50K', min: 25000, max: 50000 },
  { id: '50k-1l', label: '₹50K - 1L', min: 50000, max: 100000 },
  { id: '1l-5l', label: '₹1L - 5L', min: 100000, max: 500000 },
  { id: '5l+', label: '₹5L+', min: 500000, max: null },
] as const;

export const FOLLOWER_RANGES = [
  '1K - 10K',
  '10K - 50K',
  '50K - 100K',
  '100K - 500K',
  '500K - 1M',
  '1M+',
] as const;

export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', color: '#E4405F' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'x', name: 'X', color: '#000000' },
] as const;
