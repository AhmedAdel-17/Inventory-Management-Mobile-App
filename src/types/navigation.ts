// src/types/navigation.ts
export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
  CompaniesManagement: undefined;
  SubscriptionManagement: undefined;
  WarehouseManagement: undefined;
  Analytics: undefined;
  CreateCompany: undefined;
  PendingApprovals: undefined;
  EditCompany: { companyId: string };
  EditWarehouse: { warehouseId: string };
};