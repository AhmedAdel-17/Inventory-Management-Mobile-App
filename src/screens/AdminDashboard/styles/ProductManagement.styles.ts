// src/screens/ProductManagement/styles/ProductManagement.styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 2,
  },
  addButton: {
    padding: theme.spacing.sm,
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  productCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  cardContent: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.xs,
  },
  productSku: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.xs,
  },
  productDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: theme.spacing.md,
  },
  
  // ✅ FIXED: Better layout for product meta information
  productMeta: {
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
  priceStockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  priceContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  priceLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  quantityContainer: {
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 2,
    textAlign: 'center',
  },
  quantityValue: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    textAlign: 'center',
  },
  statusBadgeContainer: {
    alignSelf: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.semiBold,
    textAlign: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  actionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.info,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: theme.spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  
  // ✅ FIXED: Modal body for better scrolling and image upload visibility
  modalBody: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    flexGrow: 1,
  },
  
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
    paddingTop: theme.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    marginHorizontal: -theme.spacing.sm,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  
  // ✅ FIXED: Enhanced image upload button
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.accent,
    borderStyle: 'dashed',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  imageUploadText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.sm,
  },
  
  modalFooter: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cancelButtonText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  createButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: theme.typography.fontSize.md,
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  filterOptionActive: {
    backgroundColor: theme.colors.accent + '20',
  },
  filterOptionText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  filterOptionTextActive: {
    color: theme.colors.accent,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
});
