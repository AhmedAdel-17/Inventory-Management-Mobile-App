// src/screens/ContactAdmin/ContactAdmin.tsx
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
import { styles } from './ContactAdmin.styles';
import { commonStyles, formStyles, buttonStyles } from '../styles/commonStyles';
import { theme } from '../../theme/theme';
import { Alert } from '../../components/CustomAlert';

const ContactAdmin: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    message: '',
  });

  const companySizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees',
  ];

  const contactMethods = [
    { icon: 'email', title: 'Email', value: 'support@inventorypro.com', color: theme.colors.info },
    { icon: 'phone', title: 'Phone', value: '+1 (555) 123-4567', color: theme.colors.success },
    { icon: 'whatsapp', title: 'WhatsApp', value: '+1 (555) 123-4567', color: '#25D366' },
    { icon: 'office-building', title: 'Office', value: '123 Business Ave, Suite 100\nNew York, NY 10001', color: theme.colors.accent },
  ];

  const validateForm = () => {
    if (!formData.companyName.trim()) {
      Alert.warning('Validation Error', 'Please enter your company name');
      return false;
    }
    if (!formData.contactPerson.trim()) {
      Alert.warning('Validation Error', 'Please enter contact person name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.warning('Validation Error', 'Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.warning('Invalid Email', 'Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.warning('Validation Error', 'Please enter your phone number');
      return false;
    }
    if (!formData.message.trim()) {
      Alert.warning('Validation Error', 'Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.success(
        'Request Sent',
        'Your request has been submitted successfully. Our team will contact you within 24-48 hours.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 2000);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.backButton}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Contact Admin</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.flex1}
      >
        <ScrollView
          style={commonStyles.scrollView}
          contentContainerStyle={commonStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.05)']}
            style={styles.infoCard}
          >
            <Icon name="information" size={24} color={theme.colors.accent} />
            <Text style={styles.infoText}>
              To get started with Inventory Pro, please fill out the form below. Our sales team will review your application and contact you with next steps.
            </Text>
          </LinearGradient>

          <Text style={styles.sectionTitle}>Quick Contact</Text>
          <View style={styles.contactMethodsGrid}>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactMethodCard}
                onPress={() => {
                  if (method.icon === 'email') {
                    Alert.info('Email', `Send email to ${method.value}`);
                  } else if (method.icon === 'phone' || method.icon === 'whatsapp') {
                    Alert.info('Call', `Call ${method.value}`);
                  }
                }}
              >
                <View style={[styles.contactIconContainer, { backgroundColor: method.color + '20' }]}>
                  <Icon name={method.icon} size={24} color={method.color} />
                </View>
                <Text style={styles.contactMethodTitle}>{method.title}</Text>
                <Text style={styles.contactMethodValue} numberOfLines={2}>
                  {method.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Request Access</Text>
          
          <View style={formStyles.formContainer}>
            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Company Name *</Text>
              <View style={formStyles.inputContainer}>
                <TextInput
                  style={formStyles.input}
                  placeholder="Enter your company name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.companyName}
                  onChangeText={(text) => updateField('companyName', text)}
                />
              </View>
            </View>

            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Contact Person *</Text>
              <View style={formStyles.inputContainer}>
                <TextInput
                  style={formStyles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.contactPerson}
                  onChangeText={(text) => updateField('contactPerson', text)}
                />
              </View>
            </View>

            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Email Address *</Text>
              <View style={formStyles.inputContainer}>
                <TextInput
                  style={formStyles.input}
                  placeholder="company@example.com"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Phone Number *</Text>
              <View style={formStyles.inputContainer}>
                <TextInput
                  style={formStyles.input}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.phone}
                  onChangeText={(text) => updateField('phone', text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Company Size</Text>
              <View style={styles.companySizeContainer}>
                {companySizeOptions.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.companySizeOption,
                      formData.companySize === size && styles.companySizeOptionActive,
                    ]}
                    onPress={() => updateField('companySize', size)}
                  >
                    <Text
                      style={[
                        styles.companySizeText,
                        formData.companySize === size && styles.companySizeTextActive,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={formStyles.inputGroup}>
              <Text style={formStyles.inputLabel}>Message *</Text>
              <View style={[formStyles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[formStyles.input, formStyles.textArea]}
                  placeholder="Tell us about your inventory management needs..."
                  placeholderTextColor={theme.colors.textMuted}
                  value={formData.message}
                  onChangeText={(text) => updateField('message', text)}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            <View style={styles.termsContainer}>
              <Icon name="information-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.termsText}>
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[theme.colors.accent, theme.colors.accentDark]}
                style={[buttonStyles.primaryButton, styles.submitButton]}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="send" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={buttonStyles.primaryButtonText}>Submit Request</Text>
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

export default ContactAdmin;