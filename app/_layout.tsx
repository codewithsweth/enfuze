import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login-phone" />
        <Stack.Screen name="auth/login-email" />
        <Stack.Screen name="auth/otp" />
        <Stack.Screen name="auth/select-path" />
        <Stack.Screen name="onboarding/brand/add-team" />
        <Stack.Screen name="onboarding/brand/build-profile" />
        <Stack.Screen name="onboarding/influencer/connect-account" />
        <Stack.Screen name="onboarding/influencer/build-profile" />
        <Stack.Screen name="onboarding/select-categories" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="campaign/select-template" />
        <Stack.Screen name="campaign/info" />
        <Stack.Screen name="campaign/platform" />
        <Stack.Screen name="campaign/budget" />
        <Stack.Screen name="campaign/review" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
