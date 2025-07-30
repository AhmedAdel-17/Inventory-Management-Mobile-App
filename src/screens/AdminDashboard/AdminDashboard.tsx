// src/screens/AdminDashboard/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { styles } from './AdminDashboard.styles';
import { theme } from '../../theme';

interface DashboardCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  gradient: string[];
  screen: string;
}

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dashboardCards: DashboardCard[] = [
    {
      id: '1',
      title: 'Companies',
      subtitle: 'Manage all companies',
      icon: 'domain',
      color: theme.colors.primary,
      gradient: [theme.colors.primary, theme.colors.primaryDark],
      screen: 'CompaniesManagement',
    },
    {
      id: '2',
      title: 'Subscriptions',
      subtitle: 'Manage subscriptions',
      icon: 'credit-card-check',
      color: theme.colors.accent,
      gradient: [theme.colors.accent, theme.colors.accentDark],
      screen: 'SubscriptionManagement',
    },
    {
      id: '3',
      title: 'Warehouses',
      subtitle: 'Manage warehouses',
      icon: 'warehouse',
      color: theme.colors.success,
      gradient: ['#34D399', '#10B981'],
      screen: 'WarehouseManagement',
    },
    {
      id: '4',
      title: 'Analytics',
      subtitle: 'View insights & reports',
      icon: 'chart-box',
      color: theme.colors.info,
      gradient: ['#3B82F6', '#2563EB'],
      screen: 'Analytics',
    },
    {
      id: '5',
      title: 'New Company',
      subtitle: 'Register new company',
      icon: 'plus-circle',
      color: theme.colors.primaryLight,
      gradient: [theme.colors.primaryLight, theme.colors.primary],
      screen: 'CreateCompany',
    },
    {
      id: '6',
      title: 'Pending Approvals',
      subtitle: 'Review pending companies',
      icon: 'clock-alert',
      color: theme.colors.warning,
      gradient: ['#F59E0B', '#D97706'],
      screen: 'PendingApprovals',
    },
  ];

  const renderCard = (card: DashboardCard, index: number) => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [
        {
          scale: scaleAnim,
        },
        {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View
        key={card.id}
        style={[styles.cardWrapper, animatedStyle]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate(card.screen as never)}
        >
          <LinearGradient
            colors={card.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Icon name={card.icon} size={32} color="#FFFFFF" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()} 
            style={styles.menuButton}
          >
            <Icon name="menu" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.adminName}>Admin</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.accentDark]}
              style={styles.profileGradient}
            >
              <Icon name="account" size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.05)']}
            style={styles.statCard}
          >
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Active Companies</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
            style={styles.statCard}
          >
            <Text style={styles.statNumber}>89%</Text>
            <Text style={styles.statLabel}>Subscription Rate</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => renderCard(card, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;