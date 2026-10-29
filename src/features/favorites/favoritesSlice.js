import { createSlice } from '@reduxjs/toolkit';

const readFavorites = () => {
  try { return JSON.parse(localStorage.getItem('gaming-favorites') || '[]'); }
  catch { return []; }
};
const initialState = { items: readFavorites() };
const persist = (items) => {
  try { localStorage.setItem('gaming-favorites', JSON.stringify(items)); } catch {}
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      state.items = exists ? state.items.filter((item) => item.id !== product.id) : [...state.items, product];
      persist(state.items);
    },
    clearFavorites(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
