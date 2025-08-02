// src/components/CustomAlert/CustomAlert.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../CustomAlert.styles';
import { theme } from '../../theme/theme';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  icon?: string;
  showIcon?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type = 'info',
  title,
  message,
  buttons = [{ text: 'OK', style: 'default' }],
  onClose,
  icon,
  showIcon = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          name: icon || 'check-circle',
          color: theme.colors.success,
          gradient: ['#34D399', '#10B981'],
        };
      case 'error':
        return {
          name: icon || 'close-circle',
          color: theme.colors.error,
          gradient: ['#EF4444', '#DC2626'],
        };
      case 'warning':
        return {
          name: icon || 'alert-circle',
          color: theme.colors.warning,
          gradient: ['#F59E0B', '#D97706'],
        };
      case 'info':
        return {
          name: icon || 'information',
          color: theme.colors.info,
          gradient: ['#3B82F6', '#2563EB'],
        };
      case 'confirm':
        return {
          name: icon || 'help-circle',
          color: theme.colors.accent,
          gradient: [theme.colors.accent, theme.colors.accentDark],
        };
      default:
        return {
          name: 'information',
          color: theme.colors.info,
          gradient: ['#3B82F6', '#2563EB'],
        };
    }
  };

  const iconConfig = getIconConfig();

  const getButtonStyle = (style?: string) => {
    switch (style) {
      case 'destructive':
        return {
          gradient: ['#EF4444', '#DC2626'],
          textColor: '#FFFFFF',
        };
      case 'cancel':
        return {
          gradient: [theme.colors.surface, theme.colors.surface],
          textColor: theme.colors.textSecondary,
          borderColor: theme.colors.border,
        };
      default:
        return {
          gradient: [theme.colors.accent, theme.colors.accentDark],
          textColor: '#FFFFFF',
        };
    }
  };

  const handleButtonPress = (button: AlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {showIcon && (
            <LinearGradient
              colors={iconConfig.gradient}
              style={styles.iconContainer}
            >
              <Icon name={iconConfig.name} size={40} color="#FFFFFF" />
            </LinearGradient>
          )}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => {
              const buttonStyle = getButtonStyle(button.style);
              const isLastButton = index === buttons.length - 1;

              if (button.style === 'cancel') {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      styles.cancelButton,
                      !isLastButton && styles.buttonMargin,
                    ]}
                    onPress={() => handleButtonPress(button)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.buttonText, { color: buttonStyle.textColor }]}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleButtonPress(button)}
                  activeOpacity={0.8}
                  style={!isLastButton ? styles.buttonMargin : undefined}
                >
                  <LinearGradient
                    colors={buttonStyle.gradient}
                    style={styles.button}
                  >
                    <Text style={[styles.buttonText, { color: buttonStyle.textColor }]}>
                      {button.text}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Alert Manager Singleton
class AlertManager {
  private static instance: AlertManager;
  private showAlert?: (props: Omit<CustomAlertProps, 'visible'>) => void;

  static getInstance(): AlertManager {
    if (!AlertManager.instance) {
      AlertManager.instance = new AlertManager();
    }
    return AlertManager.instance;
  }

  setShowAlert(showAlert: (props: Omit<CustomAlertProps, 'visible'>) => void) {
    this.showAlert = showAlert;
  }

  alert(
    title: string,
    message: string,
    buttons?: AlertButton[],
    options?: { type?: AlertType; icon?: string; showIcon?: boolean }
  ) {
    if (this.showAlert) {
      this.showAlert({
        title,
        message,
        buttons,
        type: options?.type || 'info',
        icon: options?.icon,
        showIcon: options?.showIcon !== false,
      });
    }
  }

  success(title: string, message: string, buttons?: AlertButton[]) {
    this.alert(title, message, buttons, { type: 'success' });
  }

  error(title: string, message: string, buttons?: AlertButton[]) {
    this.alert(title, message, buttons, { type: 'error' });
  }

  warning(title: string, message: string, buttons?: AlertButton[]) {
    this.alert(title, message, buttons, { type: 'warning' });
  }

  info(title: string, message: string, buttons?: AlertButton[]) {
    this.alert(title, message, buttons, { type: 'info' });
  }

  confirm(title: string, message: string, onConfirm: () => void, onCancel?: () => void) {
    this.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel', onPress: onCancel },
        { text: 'Confirm', style: 'default', onPress: onConfirm },
      ],
      { type: 'confirm' }
    );
  }
}

export const Alert = AlertManager.getInstance();