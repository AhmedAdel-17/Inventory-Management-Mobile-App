// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';
import warehousesReducer from './slices/warehousesSlice';
import analyticsReducer from './slices/analyticsSlice';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    warehouses: warehousesReducer,
    analytics: analyticsReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;