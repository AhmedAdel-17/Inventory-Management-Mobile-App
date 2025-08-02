// src/navigation/AppNavigator.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../theme/theme';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

// Import screens
import Login from '../screens/Login/Login';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard';
import CompaniesManagement from '../screens/AdminDashboard/CompaniesManagement';
import CreateCompany from '../screens/AdminDashboard/CreateCompany';
import WarehouseManagement from '../screens/AdminDashboard/WarehouseManagement';
import Analytics from '../screens/AdminDashboard/Analytics';
import SubscriptionManagement from '../screens/AdminDashboard/SubscriptionManagement';
import PendingApprovals from '../screens/AdminDashboard/PendingApprovals';
import Profile from '../screens/AdminDashboard/Profile';
import Settings from '../screens/AdminDashboard/Settings';
import CategoryManagement from '../screens/AdminDashboard/CategoryManagement';
import ProductManagement from '../screens/AdminDashboard/ProductManagement';
import ForgotPassword from '../screens/Login/ForgotPassword';
import ContactAdmin from '../screens/Login/ContactAdmin';

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
  ForgotPassword: undefined;
  ContactAdmin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    // Navigate to login screen
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        
        {/* Header */}
        <View style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          marginBottom: 10,
        }}>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <Icon name="account" size={40} color="#FFFFFF" />
            )}
          </LinearGradient>
          <Text style={{
            fontSize: 20,
            color: theme.colors.textPrimary,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
            {user?.name || 'Admin User'}
          </Text>
          <Text style={{
            fontSize: 14,
            color: theme.colors.textSecondary,
          }}>
            {user?.email || 'admin@inventorypro.com'}
          </Text>
        </View>

        {/* Drawer Items */}
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        {/* Footer */}
        <View style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
          >
            <Icon name="logout" size={24} color={theme.colors.error} />
            <Text style={{
              marginLeft: 16,
              fontSize: 16,
              color: theme.colors.error,
              fontWeight: '500',
            }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
        drawerActiveTintColor: theme.colors.accent,
        drawerInactiveTintColor: theme.colors.textSecondary,
        drawerActiveBackgroundColor: theme.colors.accent + '20',
        drawerItemStyle: {
          borderRadius: 8,
          marginHorizontal: 8,
          marginVertical: 2,
        },
      }}
    >
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          title: 'Dashboard',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Main App Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        
        {/* Stack screens accessible from dashboard */}
        <Stack.Screen 
          name="CompaniesManagement" 
          component={CompaniesManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateCompany" 
          component={CreateCompany}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="WarehouseManagement" 
          component={WarehouseManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Analytics" 
          component={Analytics}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SubscriptionManagement" 
          component={SubscriptionManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PendingApprovals" 
          component={PendingApprovals}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CategoryManagement" 
          component={CategoryManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ProductManagement" 
          component={ProductManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ContactAdmin" 
          component={ContactAdmin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;