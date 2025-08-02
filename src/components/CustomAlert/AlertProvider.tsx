// src/components/CustomAlert/AlertProvider.tsx
import React, { useState, useEffect } from 'react';
import { CustomAlert, Alert, AlertType } from './CustomAlert';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  type: AlertType;
  buttons: AlertButton[];
  icon?: string;
  showIcon: boolean;
}

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    buttons: [],
    showIcon: true,
  });

  useEffect(() => {
    Alert.setShowAlert((props) => {
      setAlertState({
        visible: true,
        title: props.title,
        message: props.message,
        type: props.type || 'info',
        buttons: props.buttons || [{ text: 'OK', style: 'default' }],
        icon: props.icon,
        showIcon: props.showIcon !== false,
      });
    });
  }, []);

  const handleClose = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      {children}
      <CustomAlert
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        buttons={alertState.buttons}
        icon={alertState.icon}
        showIcon={alertState.showIcon}
        onClose={handleClose}
      />
    </>
  );
};