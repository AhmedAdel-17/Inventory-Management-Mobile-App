// src/screens/WarehouseManagement/WarehouseManagement.tsx
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
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/WarehouseManagement.styles';
import { theme } from '../../theme/theme';
import { Warehouse } from '../../types';

const WarehouseManagement: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    address: '',
    capacity: '',
    manager: '',
    contactNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for warehouses
  const mockWarehouses: Warehouse[] = [
    {
      id: '1',
      companyId: '1',
      name: 'Central Distribution Center',
      address: '789 Logistics Blvd, Los Angeles, CA',
      capacity: 50000,
      currentUtilization: 75,
      manager: 'John Smith',
      contactNumber: '+1-555-0123',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-07-20'),
    },
    {
      id: '2',
      companyId: '1',
      name: 'East Coast Hub',
      address: '456 Storage Ave, Newark, NJ',
      capacity: 35000,
      currentUtilization: 60,
      manager: 'Sarah Johnson',
      contactNumber: '+1-555-0124',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-07-15'),
    },
    {
      id: '3',
      companyId: '2',
      name: 'Midwest Facility',
      address: '123 Warehouse Dr, Chicago, IL',
      capacity: 25000,
      currentUtilization: 90,
      manager: 'Mike Wilson',
      contactNumber: '+1-555-0125',
      status: 'maintenance',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-07-18'),
    },
  ];

  const companies = [
    { id: 'all', name: 'All Companies' },
    { id: '1', name: 'TechCorp Industries' },
    { id: '2', name: 'Global Logistics Ltd' },
  ];

  const filteredWarehouses = selectedCompany === 'all' 
    ? mockWarehouses 
    : mockWarehouses.filter(w => w.companyId === selectedCompany);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return theme.colors.error;
    if (utilization >= 70) return theme.colors.warning;
    return theme.colors.success;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return theme.colors.success;
      case 'maintenance': return theme.colors.warning;
      case 'inactive': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const handleCreateWarehouse = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalVisible(false);
      setNewWarehouse({ name: '', address: '', capacity: '', manager: '', contactNumber: '' });
    }, 1500);
  };

  const renderWarehouseCard = ({ item }: { item: Warehouse }) => (
    <TouchableOpacity style={styles.warehouseCard} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.warehouseInfo}>
          <Text style={styles.warehouseName}>{item.name}</Text>
          <View style={styles.addressRow}>
            <Icon name="map-marker" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{item.capacity.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Capacity (sq ft)</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.utilizationRow}>
            <Text style={[styles.statValue, { color: getUtilizationColor(item.currentUtilization) }]}>
              {item.currentUtilization}%
            </Text>
            <Icon 
              name={item.currentUtilization >= 90 ? 'alert' : 'check-circle'} 
              size={16} 
              color={getUtilizationColor(item.currentUtilization)} 
            />
          </View>
          <Text style={styles.statLabel}>Utilization</Text>
        </View>
      </View>

      <View style={styles.managerContainer}>
        <Icon name="account" size={16} color={theme.colors.textSecondary} />
        <Text style={styles.managerText}>{item.manager}</Text>
        <Icon name="phone" size={16} color={theme.colors.textSecondary} style={styles.phoneIcon} />
        <Text style={styles.managerText}>{item.contactNumber}</Text>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="pencil" size={16} color={theme.colors.accent} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chart-line" size={16} color={theme.colors.info} />
          <Text style={styles.actionButtonText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Icon name="delete" size={16} color={theme.colors.error} />
          <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Warehouse Management</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
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

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {companies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={[
                styles.filterButton,
                selectedCompany === company.id && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCompany(company.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCompany === company.id && styles.filterButtonTextActive,
                ]}
              >
                {company.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredWarehouses}
        renderItem={renderWarehouseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Warehouse</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Warehouse Name</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter warehouse name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newWarehouse.name}
                  onChangeText={(text) => setNewWarehouse({ ...newWarehouse, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={[styles.modalInput, styles.textArea]}
                  placeholder="Enter warehouse address"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newWarehouse.address}
                  onChangeText={(text) => setNewWarehouse({ ...newWarehouse, address: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Capacity (sq ft)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter capacity"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newWarehouse.capacity}
                  onChangeText={(text) => setNewWarehouse({ ...newWarehouse, capacity: text })}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Manager Name</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter manager name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newWarehouse.manager}
                  onChangeText={(text) => setNewWarehouse({ ...newWarehouse, manager: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Number</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter contact number"
                  placeholderTextColor={theme.colors.textMuted}
                  value={newWarehouse.contactNumber}
                  onChangeText={(text) => setNewWarehouse({ ...newWarehouse, contactNumber: text })}
                  keyboardType="phone-pad"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleCreateWarehouse}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[theme.colors.accent, theme.colors.accentDark]}
                  style={styles.createButton}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.createButtonText}>Create Warehouse</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WarehouseManagement;