import { StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
    flex: 1,
    textAlign: 'center',
  },
  exportButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },

  /** SCROLL **/
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: theme.spacing.xxl },

  /** PERIOD SELECTOR **/
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: 4,
    elevation: 2,
  },
  periodButtonActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  periodButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },

  /** METRICS GRID **/
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.accent + '20',
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  changeText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  metricValue: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  metricTitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  },

  /** CHART CONTAINERS - PERFECTED **/
  chartContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    overflow: 'hidden', // Critical: Prevent chart overflow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  
  // PERFECTED: Chart wrapper with exact positioning
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    paddingVertical: theme.spacing.xs,
    // Ensure charts don't exceed boundaries
    maxWidth: '100%',
  },

  /** PIE CHART - PERFECTED **/
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  pieChartSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    width: '100%',
    overflow: 'hidden',
  },
  pieCenterLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pieCenterValue: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.primaryDark,
    fontFamily: theme.typography.fontFamily.bold,
    letterSpacing: 0.5,
  },
  pieCenterText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primaryDark,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 2,
  },
  
  legendSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    width: '100%',
    maxWidth: 200,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: theme.spacing.md,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  legendValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    minWidth: 30,
    textAlign: 'right',
  },

  legendContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing.md,
  },
  legendText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },

  insightsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  insightsTitle: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.lg,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'flex-start',
    elevation: 2,
  },
  insightContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  insightText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    lineHeight: 20,
  },
});