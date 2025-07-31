// src/store/slices/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LanguageType = 'en' | 'es' | 'fr' | 'de';
type CurrencyType = 'USD' | 'EUR' | 'GBP';
type DateFormatType = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

interface NotificationsType {
  email: boolean;
  push: boolean;
  sms: boolean;
  newCompanies: boolean;
  subscriptionExpiry: boolean;
  warehouseAlerts: boolean;
}

interface SettingsState {
  theme: 'dark' | 'light';
  language: LanguageType;
  notifications: NotificationsType;
  currency: CurrencyType;
  dateFormat: DateFormatType;
  autoLogout: boolean;
  autoLogoutTime: number; // in minutes
}

const initialState: SettingsState = {
  theme: 'dark',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    sms: false,
    newCompanies: true,
    subscriptionExpiry: true,
    warehouseAlerts: true,
  },
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  autoLogout: true,
  autoLogoutTime: 30,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
    },
    updateNotifications: (state, action: PayloadAction<Partial<NotificationsType>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.currency = action.payload;
    },
    setDateFormat: (state, action: PayloadAction<DateFormatType>) => {
      state.dateFormat = action.payload;
    },
    setAutoLogout: (state, action: PayloadAction<boolean>) => {
      state.autoLogout = action.payload;
    },
    setAutoLogoutTime: (state, action: PayloadAction<number>) => {
      state.autoLogoutTime = action.payload;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  updateNotifications,
  setCurrency,
  setDateFormat,
  setAutoLogout,
  setAutoLogoutTime,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;