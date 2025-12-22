# Project Architecture & Code Organization

This document outlines the folder structure, naming conventions, and architectural decisions for the ENFUZE influencer marketing platform.

## Folder Structure

```
project/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation screens
│   ├── auth/                     # Authentication screens
│   ├── campaign/                 # Campaign creation flow
│   ├── onboarding/              # Onboarding screens
│   └── _layout.tsx              # Root navigation layout
├── components/                   # Reusable components
│   ├── ui/                      # Generic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   └── Radio.tsx
│   └── campaign/                # Campaign-specific components
│       ├── CampaignHeader.tsx
│       ├── ProgressIndicator.tsx
│       ├── PlatformCard.tsx
│       ├── BudgetCard.tsx
│       └── TemplateCard.tsx
├── constants/                    # App-wide constants
│   ├── theme.ts                 # Colors, spacing, typography
│   └── campaign.ts              # Campaign data (templates, categories, etc.)
├── contexts/                     # React Context providers
│   └── AuthContext.tsx
├── hooks/                        # Custom React hooks
│   └── useFrameworkReady.ts
├── lib/                          # Third-party library configurations
│   └── supabase.ts
├── types/                        # TypeScript type definitions
│   └── campaign.ts
└── assets/                       # Static assets (images, fonts)
```

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (e.g., `Button.tsx`, `CampaignHeader.tsx`)
- **Screens**: kebab-case (e.g., `select-template.tsx`, `login-email.tsx`)
- **Constants**: camelCase (e.g., `theme.ts`, `campaign.ts`)
- **Types**: camelCase with `.ts` extension (e.g., `campaign.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useFrameworkReady.ts`)

### Variables & Functions
- **Constants**: UPPER_SNAKE_CASE for primitive values (e.g., `COLORS`, `SPACING`)
- **Objects**: camelCase for constant objects (e.g., `budgetRanges`, `ageGroups`)
- **Components**: PascalCase (e.g., `function Button()`, `export default CampaignHeader`)
- **Functions**: camelCase (e.g., `handleContinue`, `togglePlatform`)
- **Variables**: camelCase (e.g., `selectedPlatforms`, `currentStep`)

## Component Guidelines

### UI Components (`components/ui/`)
Generic, reusable components that can be used throughout the app:
- **Button**: Supports variants (primary, secondary, outline) and sizes
- **Input**: Text input with label and error handling
- **Checkbox**: Selectable checkbox with label
- **Radio**: Radio button with label

### Campaign Components (`components/campaign/`)
Domain-specific components for the campaign creation flow:
- **CampaignHeader**: Header with back/close buttons
- **ProgressIndicator**: Shows current step in multi-step flow
- **PlatformCard**: Social platform selection card
- **BudgetCard**: Budget range selection card
- **TemplateCard**: Campaign template selection card

## Constants Organization

### Theme (`constants/theme.ts`)
Centralized design tokens:
- `COLORS`: All color values including gradients
- `SPACING`: Standard spacing units (xs, sm, md, lg, xl, xxl)
- `FONT_SIZES`: Typography scale
- `BORDER_RADIUS`: Border radius values

### Campaign Data (`constants/campaign.ts`)
Campaign-related data:
- `CAMPAIGN_TEMPLATES`: Pre-defined campaign templates
- `CATEGORIES`: Industry categories
- `AGE_GROUPS`: Target age ranges
- `GENDERS`: Gender options
- `BUDGET_RANGES`: Budget range options
- `FOLLOWER_RANGES`: Follower count ranges
- `PLATFORMS`: Social media platforms

## Type Definitions

### Campaign Types (`types/campaign.ts`)
TypeScript interfaces for campaign-related data:
- `CampaignTemplate`: Template structure
- `Platform`: Platform data structure
- `AgeGroup`, `Gender`, `BudgetRange`: Selection option types
- `CampaignData`: Complete campaign data structure

## Best Practices

### Component Design
1. **Single Responsibility**: Each component should have one clear purpose
2. **Prop Interfaces**: Always define TypeScript interfaces for props
3. **Reusability**: Extract repeated patterns into shared components
4. **Composition**: Build complex UIs by composing smaller components

### State Management
1. **Local State**: Use `useState` for component-specific state
2. **Context**: Use React Context for shared state (e.g., AuthContext)
3. **Props**: Pass data down through props when possible

### Styling
1. **StyleSheet API**: Use React Native's StyleSheet.create()
2. **Theme Constants**: Reference colors, spacing from theme constants
3. **Inline Styles**: Avoid inline styles; use StyleSheet for performance
4. **Consistent Spacing**: Use spacing constants for margins/padding

### Import Order
1. React imports
2. React Native imports
3. Third-party libraries
4. Local components
5. Constants, types, and utilities

Example:
```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CampaignHeader from '@/components/campaign/CampaignHeader';
import Button from '@/components/ui/Button';
import { COLORS, SPACING } from '@/constants/theme';
import { PLATFORMS } from '@/constants/campaign';
import type { Platform } from '@/types/campaign';
```

## Future Improvements

### Recommended Additions
1. **Utils/Helpers**: Create `/utils` folder for utility functions
2. **Services**: Create `/services` folder for API calls
3. **State Management**: Consider Zustand or Redux for complex state
4. **Testing**: Add unit tests for components and utilities
5. **Storybook**: Document components with Storybook
6. **Form Validation**: Add validation library (e.g., Zod, Yup)

### Code Quality
- Use ESLint and Prettier for consistent code formatting
- Implement pre-commit hooks with Husky
- Add CI/CD pipeline for automated testing
- Document complex components with JSDoc comments
