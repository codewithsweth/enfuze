import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function OTPScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyOTP, signInWithPhone } = useAuth();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(24);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    router.replace('/auth/select-path');
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setError('');

    try {
      await signInWithPhone(phone);
      setResendTimer(24);
      setOtp(['', '', '', '', '', '']);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageGrid}>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg' }}
              style={styles.gridImage}
            />
          </View>
        </View>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/949131/pexels-photo-949131.jpeg' }}
              style={styles.gridImage}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' }}
              style={styles.gridImage}
            />
          </View>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>
          <Text style={styles.logoE}>E</Text>
          <Text style={styles.logoN}>N</Text>
          <Text style={styles.logoF}>F</Text>
          <Text style={styles.logoU}>U</Text>
          <Text style={styles.logoZ}>Z</Text>
          <Text style={styles.logoE2}>E</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.progressBar} />

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#E5E7EB" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.description}>
          Enter the 6-digit code sent to{'\n'}
          <Text style={styles.phoneNumber}>{phone}</Text>
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend OTP in </Text>
          <Text style={styles.resendTimer}>{resendTimer}s</Text>
        </View>

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
        >
          <LinearGradient
            colors={['#2DD4BF', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.changePhoneText}>Change phone number</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  imageGrid: {
    marginBottom: 40,
    opacity: 0.3,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logoE: {
    color: '#FF6B35',
  },
  logoN: {
    color: '#4ADE80',
  },
  logoF: {
    color: '#EC4899',
  },
  logoU: {
    color: '#FBBF24',
  },
  logoZ: {
    color: '#3B82F6',
  },
  logoE2: {
    color: '#FF6B35',
  },
  card: {
    backgroundColor: '#1A2332',
    borderRadius: 24,
    padding: 24,
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 4,
    backgroundColor: '#374151',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  phoneNumber: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: '#374151',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  otpInputFilled: {
    borderColor: '#2DD4BF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  resendTimer: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '600',
  },
  verifyButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  changePhoneText: {
    color: '#9CA3AF',
    textAlign: 'center',
    fontSize: 14,
  },
});
