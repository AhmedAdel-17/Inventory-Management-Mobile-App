// src/screens/Login/Login.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradientBackground: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.xl,
  },
  appTitle: {
    fontSize: theme.typography.fontSize.xxxl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  appSubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  eyeIcon: {
    padding: theme.spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.medium,
  },
  loginButton: {
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  loginButtonText: {
    fontSize: theme.typography.fontSize.lg,
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: theme.spacing.md,
  },
  socialButtonText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.sm,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  signUpText: {
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
});