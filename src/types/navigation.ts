// src/types/navigation.ts
export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
  AdminDashboard: undefined;
  CompaniesManagement: undefined;
  SubscriptionManagement: undefined;
  WarehouseManagement: undefined;
  Analytics: undefined;
  CreateCompany: undefined;
  PendingApprovals: undefined;
  EditCompany: { companyId: string };
  EditWarehouse: { warehouseId: string };
  CategoryManagement: undefined;
  ProductManagement: { categoryId: string; categoryName: string };
  Profile: undefined;
  Settings: undefined;
  ForgotPassword: undefined;
  ContactAdmin: undefined;
};

export type DrawerParamList = {
  AdminDashboard: undefined;
  Profile: undefined;
  Settings: undefined;
};