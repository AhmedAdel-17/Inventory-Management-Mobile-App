// src/screens/ForgotPassword/ForgotPassword.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './ForgotPassword.styles';
import { commonStyles, formStyles, buttonStyles } from '../styles/commonStyles';
import { theme } from '../../theme/theme';
import { Alert } from '../../components/CustomAlert';

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendCode = () => {
    if (!email.trim()) {
      Alert.warning('Validation Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.warning('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCodeSent(true);
      Alert.success(
        'Code Sent',
        `A verification code has been sent to ${email}. Please check your inbox.`
      );
    }, 1500);
  };

  const handleResetPassword = () => {
    if (!verificationCode.trim()) {
      Alert.warning('Validation Error', 'Please enter the verification code');
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.warning('Validation Error', 'Please fill in all password fields');
      return;
    }

    if (newPassword.length < 8) {
      Alert.warning('Weak Password', 'Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.error('Password Mismatch', 'The passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.success(
        'Password Reset',
        'Your password has been reset successfully!',
        [
          {
            text: 'Login Now',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1500);
  };

  const renderEmailStep = () => (
    <>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentDark]}
          style={styles.iconGradient}
        >
          <Icon name="lock-reset" size={50} color="#FFFFFF" />
        </LinearGradient>
      </View>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.description}>
        Don't worry! Enter your email address and we'll send you a verification code to reset your password.
      </Text>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.inputLabel}>Email Address</Text>
        <View style={formStyles.inputWithIcon}>
          <Icon name="email" size={20} color={theme.colors.textSecondary} style={formStyles.inputIcon} />
          <TextInput
            style={[formStyles.input, { flex: 1 }]}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSendCode}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentDark]}
          style={buttonStyles.primaryButton}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={buttonStyles.primaryButtonText}>Send Verification Code</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderResetStep = () => (
    <>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[theme.colors.success, '#10B981']}
          style={styles.iconGradient}
        >
          <Icon name="email-check" size={50} color="#FFFFFF" />
        </LinearGradient>
      </View>

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>
        Enter the verification code sent to {email} and create your new password.
      </Text>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.inputLabel}>Verification Code</Text>
        <View style={formStyles.inputWithIcon}>
          <Icon name="numeric" size={20} color={theme.colors.textSecondary} style={formStyles.inputIcon} />
          <TextInput
            style={[formStyles.input, { flex: 1 }]}
            placeholder="Enter 6-digit code"
            placeholderTextColor={theme.colors.textMuted}
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
      </View>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.inputLabel}>New Password</Text>
        <View style={formStyles.inputWithIcon}>
          <Icon name="lock" size={20} color={theme.colors.textSecondary} style={formStyles.inputIcon} />
          <TextInput
            style={[formStyles.input, { flex: 1 }]}
            placeholder="Enter new password"
            placeholderTextColor={theme.colors.textMuted}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showNewPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={formStyles.inputGroup}>
        <Text style={formStyles.inputLabel}>Confirm Password</Text>
        <View style={formStyles.inputWithIcon}>
          <Icon name="lock-check" size={20} color={theme.colors.textSecondary} style={formStyles.inputIcon} />
          <TextInput
            style={[formStyles.input, { flex: 1 }]}
            placeholder="Confirm new password"
            placeholderTextColor={theme.colors.textMuted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleResetPassword}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.colors.accent, theme.colors.accentDark]}
          style={buttonStyles.primaryButton}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={buttonStyles.primaryButtonText}>Reset Password</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resendButton}
        onPress={() => {
          Alert.info('Code Resent', 'A new verification code has been sent to your email.');
        }}
      >
        <Text style={styles.resendText}>Didn't receive the code? Resend</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Password Recovery</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.flex1}
      >
        <View style={styles.content}>
          {!codeSent ? renderEmailStep() : renderResetStep()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;