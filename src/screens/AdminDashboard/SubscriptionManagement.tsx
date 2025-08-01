// src/screens/SubscriptionManagement/SubscriptionManagement.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/SubscriptionManagement.styles';
import { theme } from '../../theme/theme';

interface Subscription {
  id: string;
  companyName: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  status: 'active' | 'expiring' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
  autoRenew: boolean;
}

const SubscriptionManagement: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all');
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const mockSubscriptions: Subscription[] = [
    {
      id: '1',
      companyName: 'TechCorp Industries',
      tier: 'platinum',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      amount: 999,
      autoRenew: true,
    },
    {
      id: '2',
      companyName: 'Global Logistics Ltd',
      tier: 'gold',
      status: 'expiring',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-08-15'),
      amount: 599,
      autoRenew: false,
    },
    {
      id: '3',
      companyName: 'Retail Solutions Inc',
      tier: 'silver',
      status: 'active',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2025-10-31'),
      amount: 299,
      autoRenew: true,
    },
  ];

  const filteredSubscriptions = selectedFilter === 'all' 
    ? mockSubscriptions 
    : mockSubscriptions.filter(s => s.status === selectedFilter);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'crown';
      case 'gold': return 'medal';
      case 'silver': return 'trophy-variant';
      case 'bronze': return 'shield';
      default: return 'star';
    }
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
      case 'active': return theme.colors.success;
      case 'expiring': return theme.colors.warning;
      case 'expired': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderSubscriptionCard = ({ item }: { item: Subscription }) => {
    const daysRemaining = getDaysRemaining(item.endDate);
    
    return (
      <TouchableOpacity 
        style={styles.subscriptionCard}
        onPress={() => {
          setSelectedSubscription(item);
          setUpgradeModalVisible(true);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{item.companyName}</Text>
            <View style={styles.tierContainer}>
              <Icon name={getTierIcon(item.tier)} size={16} color={getTierColor(item.tier)} />
              <Text style={[styles.tierText, { color: getTierColor(item.tier) }]}>
                {item.tier.toUpperCase()} TIER
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.subscriptionDetails}>
          <View style={styles.detailRow}>
            <Icon name="calendar-range" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="currency-usd" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>${item.amount}/month</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name={item.autoRenew ? 'autorenew' : 'close-circle'} size={16} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>
              {item.autoRenew ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.daysRemainingContainer}>
            <Icon 
              name="clock-outline" 
              size={16} 
              color={daysRemaining < 30 ? theme.colors.warning : theme.colors.textSecondary} 
            />
            <Text style={[
              styles.daysRemainingText,
              daysRemaining < 30 && { color: theme.colors.warning }
            ]}>
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expired'}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Manage</Text>
            <Icon name="chevron-right" size={16} color={theme.colors.accent} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Management</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => Alert.alert('Notifications', 'Notifications screen coming soon!')}
        >
          <Icon name="bell-outline" size={24} color={theme.colors.textPrimary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <LinearGradient
          colors={['rgba(52, 211, 153, 0.1)', 'rgba(52, 211, 153, 0.05)']}
          style={styles.statCard}
        >
          <Text style={styles.statValue}>$45,890</Text>
          <Text style={styles.statLabel}>Monthly Revenue</Text>
        </LinearGradient>
        
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
          style={styles.statCard}
        >
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statLabel}>Active Subscriptions</Text>
        </LinearGradient>
        
        <LinearGradient
          colors={['rgba(245, 158, 11, 0.1)', 'rgba(245, 158, 11, 0.05)']}
          style={styles.statCard}
        >
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Expiring Soon</Text>
        </LinearGradient>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'active', 'expiring', 'expired'] as const).map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterButtonText, selectedFilter === filter && styles.filterButtonTextActive]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredSubscriptions}
        renderItem={renderSubscriptionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={upgradeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpgradeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Subscription</Text>
              <TouchableOpacity onPress={() => setUpgradeModalVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {selectedSubscription && (
              <View style={styles.modalBody}>
                <Text style={styles.modalCompanyName}>{selectedSubscription.companyName}</Text>
                
                <View style={styles.currentPlanContainer}>
                  <Text style={styles.sectionTitle}>Current Plan</Text>
                  <View style={styles.currentPlanCard}>
                    <Icon 
                      name={getTierIcon(selectedSubscription.tier)} 
                      size={24} 
                      color={getTierColor(selectedSubscription.tier)} 
                    />
                    <Text style={styles.currentPlanText}>
                      {selectedSubscription.tier.toUpperCase()} - ${selectedSubscription.amount}/month
                    </Text>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Upgrade Options</Text>
                
                {selectedSubscription.tier !== 'platinum' && (
                  <TouchableOpacity style={styles.upgradeOption}>
                    <LinearGradient
                      colors={[theme.colors.tierPlatinum + '20', theme.colors.tierPlatinum + '10']}
                      style={styles.upgradeOptionGradient}
                    >
                      <Icon name="crown" size={24} color={theme.colors.tierPlatinum} />
                      <View style={styles.upgradeOptionInfo}>
                        <Text style={styles.upgradeOptionTitle}>PLATINUM</Text>
                        <Text style={styles.upgradeOptionPrice}>$999/month</Text>
                      </View>
                      <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
                    </LinearGradient>
                  </TouchableOpacity>
                )}

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.renewButton}>
                    <LinearGradient
                      colors={[theme.colors.accent, theme.colors.accentDark]}
                      style={styles.renewButtonGradient}
                    >
                      <Text style={styles.renewButtonText}>
                        {selectedSubscription.autoRenew ? 'Disable' : 'Enable'} Auto-Renewal
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubscriptionManagement;