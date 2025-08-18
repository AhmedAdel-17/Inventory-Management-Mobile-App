// src/screens/CategoryManagement/CategoryManagement.tsx
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
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../AdminDashboard/styles/CategoryManagement.styles';
import { theme } from '../../theme/theme';
import { RootStackParamList } from '../../types/navigation';
import { Alert } from '../../components/CustomAlert';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CategoryManagement'>;

interface Category {
  id: string;
  name: string;
  description: string;
  productsCount: number;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const CategoryManagement: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'package-variant',
    color: theme.colors.accent,
  });

  const mockCategories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      productsCount: 245,
      icon: 'laptop',
      color: '#3B82F6',
      status: 'active',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Furniture',
      description: 'Office and home furniture',
      productsCount: 132,
      icon: 'sofa',
      color: '#10B981',
      status: 'active',
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      name: 'Stationery',
      description: 'Office supplies and stationery',
      productsCount: 89,
      icon: 'pencil',
      color: '#F59E0B',
      status: 'active',
      createdAt: new Date('2024-03-10'),
    },
    {
      id: '4',
      name: 'Food & Beverage',
      description: 'Consumable items and drinks',
      productsCount: 56,
      icon: 'food',
      color: '#EF4444',
      status: 'inactive',
      createdAt: new Date('2024-04-05'),
    },
  ];

  const categoryIcons = [
    'laptop', 'sofa', 'pencil', 'food', 'car', 'medical-bag',
    'book', 'tshirt-crew', 'toolbox', 'flower', 'basketball', 'gift'
  ];

  const categoryColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
  ];

  const handleCreateCategory = () => {
    if (!formData.name.trim()) {
      Alert.warning('Validation Error', 'Please enter a category name');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setModalVisible(false);
      setFormData({ name: '', description: '', icon: 'package-variant', color: theme.colors.accent });
      Alert.success('Success', 'Category created successfully!');
    }, 1500);
  };

  const handleDeleteCategory = (category: Category) => {
    Alert.confirm(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      () => {
        Alert.success('Success', 'Category deleted successfully!');
      }
    );
  };

  const renderCategoryCard = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ProductManagement', { categoryId: item.id, categoryName: item.name })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon} size={32} color={item.color} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryDescription}>{item.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? theme.colors.success + '20' : theme.colors.error + '20' }]}>
          <Text style={[styles.statusText, { color: item.status === 'active' ? theme.colors.success : theme.colors.error }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.cardStats}>
        <View style={styles.statItem}>
          <Icon name="package-variant" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.statText}>{item.productsCount} Products</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="calendar" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.statText}>Created {item.createdAt.toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="pencil" size={16} color={theme.colors.info} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCategory(item)}
        >
          <Icon name="delete" size={16} color={theme.colors.error} />
          <Text style={[styles.actionText, { color: theme.colors.error }]}>Delete</Text>
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
        <Text style={styles.headerTitle}>Category Management</Text>
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

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{mockCategories.length}</Text>
          <Text style={styles.summaryLabel}>Total Categories</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{mockCategories.filter(c => c.status === 'active').length}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {mockCategories.reduce((sum, cat) => sum + cat.productsCount, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Products</Text>
        </View>
      </View>

      <FlatList
        data={mockCategories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Category Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Category</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter category name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter category description"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Select Icon</Text>
                <View style={styles.iconGrid}>
                  {categoryIcons.map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      style={[
                        styles.iconOption,
                        formData.icon === icon && styles.iconOptionActive,
                      ]}
                      onPress={() => setFormData({ ...formData, icon })}
                    >
                      <Icon 
                        name={icon} 
                        size={24} 
                        color={formData.icon === icon ? '#FFFFFF' : theme.colors.textSecondary} 
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Select Color</Text>
                <View style={styles.colorGrid}>
                  {categoryColors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        formData.color === color && styles.colorOptionActive,
                      ]}
                      onPress={() => setFormData({ ...formData, color })}
                    >
                      {formData.color === color && (
                        <Icon name="check" size={20} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
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
                onPress={handleCreateCategory}
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
                    <Text style={styles.createButtonText}>Create Category</Text>
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

export default CategoryManagement;