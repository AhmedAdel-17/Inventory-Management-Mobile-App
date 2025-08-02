// src/screens/Settings/Settings.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles/Settings.styles';
import { theme } from '../../theme/theme';
import { RootState } from '../../store';
import {
  setTheme,
  setLanguage,
  updateNotifications,
  setCurrency,
  setDateFormat,
  setAutoLogout,
  setAutoLogoutTime,
  resetSettings,
} from '../../store/slices/settingsSlice';
import { Alert } from '../../components/CustomAlert';

const Settings: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [dateFormatModalVisible, setDateFormatModalVisible] = useState(false);
  const [autoLogoutModalVisible, setAutoLogoutModalVisible] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'es' as const, name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr' as const, name: 'French', flag: '🇫🇷' },
    { code: 'de' as const, name: 'German', flag: '🇩🇪' },
  ];

  const currencies = [
    { code: 'USD' as const, symbol: '$', name: 'US Dollar' },
    { code: 'EUR' as const, symbol: '€', name: 'Euro' },
    { code: 'GBP' as const, symbol: '£', name: 'British Pound' },
  ];

  const autoLogoutTimes = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
  ];

  const handleResetSettings = () => {
    Alert.confirm(
      'Reset Settings',
      'Are you sure you want to reset all settings to default? This action cannot be undone.',
      () => {
        dispatch(resetSettings());
        Alert.success('Success', 'Settings have been reset to default');
      }
    );
  };

  const renderSectionHeader = (title: string, icon: string) => (
    <View style={styles.sectionHeader}>
      <Icon name={icon} size={24} color={theme.colors.accent} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()} 
          style={styles.menuButton}
        >
          <Icon name="menu" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          {renderSectionHeader('Appearance', 'palette')}
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Theme</Text>
              <Text style={styles.settingValue}>
                {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={settings.theme === 'dark'}
              onValueChange={(value) => { dispatch(setTheme(value ? 'dark' : 'light')); }}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={settings.theme === 'dark' ? theme.colors.accentLight : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setLanguageModalVisible(true)}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>
                {languages.find(l => l.code === settings.language)?.name}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setDateFormatModalVisible(true)}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Date Format</Text>
              <Text style={styles.settingValue}>{settings.dateFormat}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setCurrencyModalVisible(true)}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Currency</Text>
              <Text style={styles.settingValue}>
                {currencies.find(c => c.code === settings.currency)?.name}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          {renderSectionHeader('Notifications', 'bell')}
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.settingDescription}>Receive updates via email</Text>
            </View>
            <Switch
              value={settings.notifications.email}
              onValueChange={(value) => {
                dispatch(updateNotifications({ email: value }));
              }}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={settings.notifications.email ? theme.colors.accentLight : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive push notifications</Text>
            </View>
            <Switch
              value={settings.notifications.push}
              onValueChange={(value) => {
                dispatch(updateNotifications({ push: value }));
              }}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={settings.notifications.push ? theme.colors.accentLight : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>SMS Notifications</Text>
              <Text style={styles.settingDescription}>Receive SMS alerts</Text>
            </View>
            <Switch
              value={settings.notifications.sms}
              onValueChange={(value) => {
                dispatch(updateNotifications({ sms: value }));
              }}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={settings.notifications.sms ? theme.colors.accentLight : '#f4f3f4'}
            />
          </View>

          <View style={styles.notificationTypes}>
            <Text style={styles.notificationTypesTitle}>Notification Types</Text>
            
            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeLabel}>New Companies</Text>
              <Switch
                value={settings.notifications.newCompanies}
                onValueChange={(value) => {
                  dispatch(updateNotifications({ newCompanies: value }));
                }}
                trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
                thumbColor={settings.notifications.newCompanies ? theme.colors.accentLight : '#f4f3f4'}
              />
            </View>

            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeLabel}>Subscription Expiry</Text>
              <Switch
                value={settings.notifications.subscriptionExpiry}
                onValueChange={(value) => {
                  dispatch(updateNotifications({ subscriptionExpiry: value }));
                }}
                trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
                thumbColor={settings.notifications.subscriptionExpiry ? theme.colors.accentLight : '#f4f3f4'}
              />
            </View>

            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeLabel}>Warehouse Alerts</Text>
              <Switch
                value={settings.notifications.warehouseAlerts}
                onValueChange={(value) => {
                  dispatch(updateNotifications({ warehouseAlerts: value }));
                }}
                trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
                thumbColor={settings.notifications.warehouseAlerts ? theme.colors.accentLight : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          {renderSectionHeader('Security', 'shield-lock')}
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Logout</Text>
              <Text style={styles.settingDescription}>
                Automatically logout after inactivity
              </Text>
            </View>
            <Switch
              value={settings.autoLogout}
              onValueChange={(value) => { dispatch(setAutoLogout(value)); }}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={settings.autoLogout ? theme.colors.accentLight : '#f4f3f4'}
            />
          </View>

          {settings.autoLogout && (
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => setAutoLogoutModalVisible(true)}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto Logout Time</Text>
                <Text style={styles.settingValue}>
                  {autoLogoutTimes.find(t => t.value === settings.autoLogoutTime)?.label}
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>Add extra security layer</Text>
            </View>
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          {renderSectionHeader('About', 'information')}
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Terms of Service</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Privacy Policy</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Contact Support</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleResetSettings}>
          <LinearGradient
            colors={['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)']}
            style={styles.resetButton}
          >
            <Icon name="restore" size={24} color={theme.colors.error} />
            <Text style={styles.resetButtonText}>Reset All Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={languageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
                <Icon name="close" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.optionItem,
                    settings.language === lang.code && styles.optionItemActive,
                  ]}
                  onPress={() => {
                    dispatch(setLanguage(lang.code));
                    setLanguageModalVisible(false);
                  }}
                >
                  <Text style={styles.optionFlag}>{lang.flag}</Text>
                  <Text style={[
                    styles.optionText,
                    settings.language === lang.code && styles.optionTextActive,
                  ]}>
                    {lang.name}
                  </Text>
                  {settings.language === lang.code && (
                    <Icon name="check" size={20} color={theme.colors.accent} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Similar modals for Currency, Date Format, and Auto Logout Time */}
    </SafeAreaView>
  );
};
export default Settings;

