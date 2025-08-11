// src/screens/Notifications/Notifications.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
  markAllButton: {
    padding: theme.spacing.sm,
  },
  unreadBanner: {
    backgroundColor: theme.colors.accent + '20',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.accent + '30',
  },
  unreadBannerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: 'center',
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  unreadCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.accent + '30',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.medium,
    flex: 1,
  },
  unreadTitle: {
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  actionBadge: {
    backgroundColor: theme.colors.warning + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  actionBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.warning,
    fontFamily: theme.typography.fontFamily.medium,
  },
  message: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: theme.spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
  },
  deleteButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  clearAllButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  clearAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.error + '30',
  },
  clearAllText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
    fontFamily: theme.typography.fontFamily.medium,
  },
});