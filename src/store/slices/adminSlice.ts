// src/store/slices/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUser } from '../../types';

const initialState: { user: AdminUser } = {
  user: {
    id: '1',
    name: 'Admin User',
    email: 'admin@inventorypro.com',
    role: 'admin',
    avatar: '',
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<AdminUser>>) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { updateProfile } = adminSlice.actions;
export default adminSlice.reducer;