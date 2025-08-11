// src/screens/Notifications/Notifications.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Notifications.styles';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../../theme/theme';
import { Alert } from '../../components/CustomAlert';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'subscription' | 'warehouse';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  metadata?: {
    companyId?: string;
    warehouseId?: string;
    subscriptionId?: string;
  };
}

const Notifications: React.FC = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'subscription',
      title: 'Subscription Expiring Soon',
      message: 'TechCorp Industries subscription will expire in 7 days. Please renew to continue service.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionRequired: true,
      metadata: { companyId: '1', subscriptionId: '1' },
    },
    {
      id: '2',
      type: 'success',
      title: 'New Company Approved',
      message: 'StartUp Solutions has been approved and can now access the system.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      metadata: { companyId: '4' },
    },
    {
      id: '3',
      type: 'warehouse',
      title: 'Low Stock Alert',
      message: 'Warehouse "Central Distribution Center" has reached 90% capacity.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionRequired: true,
      metadata: { warehouseId: '1' },
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to the analytics dashboard. Check them out!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
    },
    {
      id: '5',
      type: 'warning',
      title: 'Payment Method Expiring',
      message: 'The credit card ending in 4242 will expire next month. Please update payment information.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      actionRequired: true,
    },
    {
      id: '6',
      type: 'error',
      title: 'Failed Import',
      message: 'Product import for Global Logistics Ltd failed. Please check the file format and try again.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true,
      metadata: { companyId: '2' },
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.info('Refreshed', 'Notifications updated');
    }, 1500);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    Alert.confirm(
      'Mark All as Read',
      'Are you sure you want to mark all notifications as read?',
      () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
        Alert.success('Success', 'All notifications marked as read');
      }
    );
  };

  const deleteNotification = (notificationId: string) => {
    Alert.confirm(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      () => {
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      }
    );
  };

  const clearAll = () => {
    Alert.confirm(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications? This action cannot be undone.',
      () => {
        setNotifications([]);
        Alert.success('Success', 'All notifications cleared');
      }
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return { name: 'check-circle', color: theme.colors.success };
      case 'warning': return { name: 'alert-circle', color: theme.colors.warning };
      case 'error': return { name: 'close-circle', color: theme.colors.error };
      case 'info': return { name: 'information', color: theme.colors.info };
      case 'subscription': return { name: 'credit-card-check', color: theme.colors.accent };
      case 'warehouse': return { name: 'warehouse', color: theme.colors.primaryLight };
      default: return { name: 'bell', color: theme.colors.textSecondary };
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type and metadata
    if (notification.metadata?.companyId) {
      navigation.navigate('CompaniesManagement' as never);
    } else if (notification.metadata?.warehouseId) {
      navigation.navigate('WarehouseManagement' as never);
    } else if (notification.metadata?.subscriptionId) {
      navigation.navigate('SubscriptionManagement' as never);
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const icon = getNotificationIcon(item.type);

    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.read && styles.unreadCard]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: icon.color + '20' }]}>
          <Icon name={icon.name} size={24} color={icon.color} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={[styles.title, !item.read && styles.unreadTitle]}>
              {item.title}
            </Text>
            {item.actionRequired && (
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>Action Required</Text>
              </View>
            )}
          </View>

          <Text style={styles.message} numberOfLines={2}>
            {item.message}
          </Text>

          <View style={styles.footerRow}>
            <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Icon name="close" size={18} color={theme.colors.textMuted} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
          <Icon name="check-all" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadBannerText}>
            You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotification}
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
          <View style={commonStyles.emptyContainer}>
            <Icon name="bell-off" size={64} color={theme.colors.textMuted} />
            <Text style={commonStyles.emptyText}>No notifications</Text>
          </View>
        }
      />

      {notifications.length > 0 && (
        <TouchableOpacity style={styles.clearAllButton} onPress={clearAll}>
          <LinearGradient
            colors={['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)']}
            style={styles.clearAllGradient}
          >
            <Icon name="delete-sweep" size={20} color={theme.colors.error} />
            <Text style={styles.clearAllText}>Clear All Notifications</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Notifications;