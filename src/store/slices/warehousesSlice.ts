import { createSlice } from '@reduxjs/toolkit';

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState: {
    warehouses: [],
    loading: false,
  },
  reducers: {},
});

export default warehousesSlice.reducer;