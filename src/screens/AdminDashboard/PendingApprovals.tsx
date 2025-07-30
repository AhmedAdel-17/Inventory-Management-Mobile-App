// src/screens/PendingApprovals/PendingApprovals.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles/PendingApprovals.styles';
import { theme } from '../../theme/theme';
import { updateCompany } from '../../store/slices/companiesSlice';
import { Company } from '../../types';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'PendingApprovals'>;

const PendingApprovals: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Mock pending companies
  const pendingCompanies: Company[] = [
    {
      id: '4',
      name: 'StartUp Solutions',
      email: 'hello@startupsolutions.com',
      phone: '+1-555-0126',
      address: '789 Innovation Drive, Austin, TX',
      status: 'pending',
      subscriptionTier: 'silver',
      subscriptionExpiry: new Date('2025-12-31'),
      createdAt: new Date('2024-07-25'),
      updatedAt: new Date('2024-07-25'),
    },
    {
      id: '5',
      name: 'Healthcare Plus',
      email: 'info@healthcareplus.com',
      phone: '+1-555-0127',
      address: '321 Medical Center Blvd, Boston, MA',
      status: 'pending',
      subscriptionTier: 'gold',
      subscriptionExpiry: new Date('2025-12-31'),
      createdAt: new Date('2024-07-28'),
      updatedAt: new Date('2024-07-28'),
    },
    {
      id: '6',
      name: 'EduTech Academy',
      email: 'contact@edutechacademy.com',
      phone: '+1-555-0128',
      address: '456 Learning Lane, Seattle, WA',
      status: 'pending',
      subscriptionTier: 'bronze',
      subscriptionExpiry: new Date('2025-12-31'),
      createdAt: new Date('2024-07-29'),
      updatedAt: new Date('2024-07-29'),
    },
  ];

  const handleApprove = (company: Company) => {
    Alert.alert(
      'Approve Company',
      `Are you sure you want to approve ${company.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          style: 'default',
          onPress: async () => {
            setProcessingId(company.id);
            // Simulate API call
            setTimeout(() => {
              dispatch(updateCompany({ ...company, status: 'approved' }));
              setProcessingId(null);
              Alert.alert('Success', `${company.name} has been approved successfully!`);
            }, 1500);
          },
        },
      ]
    );
  };

  const handleReject = (company: Company) => {
    Alert.alert(
      'Reject Company',
      `Are you sure you want to reject ${company.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            setProcessingId(company.id);
            // Simulate API call
            setTimeout(() => {
              dispatch(updateCompany({ ...company, status: 'inactive' }));
              setProcessingId(null);
              Alert.alert('Rejected', `${company.name} has been rejected.`);
            }, 1500);
          },
        },
      ]
    );
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

  const getDaysSinceCreation = (createdAt: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - createdAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderPendingCard = ({ item }: { item: Company }) => {
    const daysPending = getDaysSinceCreation(item.createdAt);
    const isProcessing = processingId === item.id;

    return (
      <View style={styles.pendingCard}>
        <View style={styles.cardHeader}>
          <View style={styles.companyHeader}>
            <Text style={styles.companyName}>{item.name}</Text>
            <View style={styles.tierBadge}>
              <Icon name="crown" size={14} color={getTierColor(item.subscriptionTier)} />
              <Text style={[styles.tierText, { color: getTierColor(item.subscriptionTier) }]}>
                {item.subscriptionTier.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.daysBadge}>
            <Icon name="clock-outline" size={14} color={theme.colors.warning} />
            <Text style={styles.daysText}>{daysPending}d ago</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Icon name="email" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{item.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>

        <View style={styles.documentSection}>
          <Text style={styles.documentTitle}>Submitted Documents</Text>
          <View style={styles.documentList}>
            <View style={styles.documentItem}>
              <Icon name="file-document" size={20} color={theme.colors.success} />
              <Text style={styles.documentText}>Business License</Text>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
            </View>
            <View style={styles.documentItem}>
              <Icon name="file-document" size={20} color={theme.colors.success} />
              <Text style={styles.documentText}>Tax Registration</Text>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
            </View>
            <View style={styles.documentItem}>
              <Icon name="file-document" size={20} color={theme.colors.success} />
              <Text style={styles.documentText}>Bank Statement</Text>
              <Icon name="check-circle" size={16} color={theme.colors.success} />
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleReject(item)}
            disabled={isProcessing}
          >
            <Icon name="close" size={20} color={theme.colors.error} />
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('EditCompany', { companyId: item.id })}
            disabled={isProcessing}
          >
            <Icon name="eye" size={20} color={theme.colors.info} />
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleApprove(item)}
            disabled={isProcessing}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[theme.colors.success, '#10B981']}
              style={[styles.approveButton, isProcessing && styles.processingButton]}
            >
              {isProcessing ? (
                <Text style={styles.approveButtonText}>Processing...</Text>
              ) : (
                <>
                  <Icon name="check" size={20} color="#FFFFFF" />
                  <Text style={styles.approveButtonText}>Approve</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pending Approvals</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{pendingCompanies.length}</Text>
        </View>
      </View>

      <FlatList
        data={pendingCompanies}
        renderItem={renderPendingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="check-all" size={64} color={theme.colors.textMuted} />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyText}>No pending approvals at the moment</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PendingApprovals;