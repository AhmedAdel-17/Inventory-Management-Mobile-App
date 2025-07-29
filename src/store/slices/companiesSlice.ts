// src/store/slices/companiesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../../types';

interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'approved' | 'inactive' | 'pending';
}

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: null,
  filter: 'all',
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const index = state.companies.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(c => c.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<CompaniesState['filter']>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  setFilter,
  setLoading,
  setError,
} = companiesSlice.actions;

export default companiesSlice.reducer;