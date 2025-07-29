// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

// Import screens
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard';
// Import other screens as you create them
// import CompaniesManagement from '../screens/CompaniesManagement/CompaniesManagement';
// import SubscriptionManagement from '../screens/SubscriptionManagement/SubscriptionManagement';
// import WarehouseManagement from '../screens/WarehouseManagement/WarehouseManagement';
// import Analytics from '../screens/Analytics/Analytics';
// import CreateCompany from '../screens/CreateCompany/CreateCompany';
// import PendingApprovals from '../screens/PendingApprovals/PendingApprovals';

export type RootStackParamList = {
  AdminDashboard: undefined;
  CompaniesManagement: undefined;
  SubscriptionManagement: undefined;
  WarehouseManagement: undefined;
  Analytics: undefined;
  CreateCompany: undefined;
  PendingApprovals: undefined;
  EditCompany: { companyId: string };
  EditWarehouse: { warehouseId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AdminDashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.colors.textPrimary,
          headerTitleStyle: {
            fontFamily: theme.typography.fontFamily.semiBold,
            fontSize: theme.typography.fontSize.lg,
          },
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
        {/* Add other screens here as you create them */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;