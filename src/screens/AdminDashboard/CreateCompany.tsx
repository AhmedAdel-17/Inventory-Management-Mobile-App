// src/screens/CreateCompany/CreateCompany.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { styles } from './CreateCompany.styles';
import { theme } from '../../theme';
import { addCompany } from '../../store/slices/companiesSlice';

const CreateCompany: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subscriptionTier: 'silver' as 'platinum' | 'gold' | 'silver' | 'bronze',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCompany = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending' as const,
        subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch(addCompany(newCompany));
      setIsLoading(false);
      navigation.goBack();
    }, 1500);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register New Company</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.05)']}
            style={styles.formCard}
          >
            <View style={styles.sectionHeader}>
              <Icon name="domain" size={24} color={theme.colors.accent} />
              <Text style={styles.sectionTitle}>Company Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Company Name *</Text>
              <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter company name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.name}
                  onChangeText={(text) => updateField('name', text)}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="company@example.com"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number *</Text>
              <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="+1-234-567-8900"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.phone}
                  onChangeText={(text) => updateField('phone', text)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address *</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer, errors.address && styles.inputError]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter company address"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.address}
                  onChangeText={(text) => updateField('address', text)}
                  multiline
                  numberOfLines={3}
                />
              </View>
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subscription Tier *</Text>
              <View style={styles.tierContainer}>
                {(['bronze', 'silver', 'gold', 'platinum'] as const).map((tier) => (
                  <TouchableOpacity
                    key={tier}
                    style={[
                      styles.tierOption,
                      formData.subscriptionTier === tier && styles.tierOptionActive,
                    ]}
                    onPress={() => updateField('subscriptionTier', tier)}
                  >
                    <Icon
                      name="crown"
                      size={20}
                      color={formData.subscriptionTier === tier ? '#FFFFFF' : theme.colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.tierText,
                        formData.subscriptionTier === tier && styles.tierTextActive,
                      ]}
                    >
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
              style={styles.submitButtonWrapper}
            >
              <LinearGradient
                colors={[theme.colors.accent, theme.colors.accentDark]}
                style={styles.submitButton}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="check" size={20} color="#FFFFFF" />
                    <Text style={styles.submitButtonText}>Register Company</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateCompany;