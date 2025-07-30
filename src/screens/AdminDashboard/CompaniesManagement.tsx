// src/screens/CompaniesManagement/CompaniesManagement.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  RefreshControl,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './CompaniesManagement.styles';
import { theme } from '../../theme';
import { RootState } from '../../store';
import { setFilter } from '../../store/slices/companiesSlice';
import { Company } from '../../types';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CompaniesManagement'>;

const CompaniesManagement: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { companies, filter } = useSelector((state: RootState) => state.companies);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Mock data for demonstration
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'TechCorp Industries',
      email: 'contact@techcorp.com',
      phone: '+1-234-567-8900',
      address: '123 Tech Street, Silicon Valley, CA',
      status: 'approved',
      subscriptionTier: 'platinum',
      subscriptionExpiry: new Date('2025-12-31'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-06-20'),
    },
    {
      id: '2',
      name: 'Global Logistics Ltd',
      email: 'info@globallogistics.com',
      phone: '+1-234-567-8901',
      address: '456 Shipping Ave, New York, NY',
      status: 'approved',
      subscriptionTier: 'gold',
      subscriptionExpiry: new Date('2025-11-30'),
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-07-15'),
    },
    {
      id: '3',
      name: 'Retail Solutions Inc',
      email: 'support@retailsolutions.com',
      phone: '+1-234-567-8902',
      address: '789 Commerce Blvd, Chicago, IL',
      status: 'pending',
      subscriptionTier: 'silver',
      subscriptionExpiry: new Date('2025-10-31'),
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-07-20'),
    },
  ];

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || company.status === filter;
    return matchesSearch && matchesFilter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return theme.colors.tierPlatinum;
      case 'gold': return theme.colors.tierGold;
      case 'silver': return theme.colors.tierSilver;
      case 'bronze': return theme.colors.tierBronze;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'inactive': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const renderCompanyCard = ({ item, index }: { item: Company; index: number }) => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [{
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      }],
    };

    return (
      <Animated.View style={[styles.cardWrapper, animatedStyle]}>
        <TouchableOpacity
          style={styles.companyCard}
          onPress={() => navigation.navigate('EditCompany', { companyId: item.id })}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{item.name}</Text>
              <Text style={styles.companyEmail}>{item.email}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.cardBody}>
            <View style={styles.infoRow}>
              <Icon name="phone" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>{item.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="map-marker" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>{item.address}</Text>
            </View>
          </View>
          
          <View style={styles.cardFooter}>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(item.subscriptionTier) + '30' }]}>
              <Icon name="crown" size={14} color={getTierColor(item.subscriptionTier)} />
              <Text style={[styles.tierText, { color: getTierColor(item.subscriptionTier) }]}>
                {item.subscriptionTier.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.expiryText}>
              Expires: {item.subscriptionExpiry.toLocaleDateString()}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderFilterButton = (filterType: typeof filter, label: string) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.filterButtonActive]}
      onPress={() => dispatch(setFilter(filterType))}
    >
      <Text style={[styles.filterButtonText, filter === filterType && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Companies Management</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCompany')}
          style={styles.addButton}
        >
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accentDark]}
            style={styles.addButtonGradient}
          >
            <Icon name="plus" size={24} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search companies..."
          placeholderTextColor={theme.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('approved', 'Approved')}
        {renderFilterButton('pending', 'Pending')}
        {renderFilterButton('inactive', 'Inactive')}
      </View>

      <FlatList
        data={filteredCompanies}
        renderItem={renderCompanyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.accent}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="domain-off" size={64} color={theme.colors.textMuted} />
            <Text style={styles.emptyText}>No companies found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CompaniesManagement;