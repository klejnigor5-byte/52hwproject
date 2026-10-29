import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api/baseApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products');
      return response.data.map((product) => ({
        ...product,
        category: product.category || 'Інше',
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Не вдалося завантажити каталог. Перевірте інтернет і спробуйте ще раз.');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
