import { createSlice } from '@reduxjs/toolkit';

const readCart = () => {
  try { return JSON.parse(localStorage.getItem('gaming-cart') || '[]'); }
  catch { return []; }
};
const initialState = { items: readCart() };

const persist = (items) => {
  try { localStorage.setItem('gaming-cart', JSON.stringify(items)); } catch {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const found = state.items.find((item) => item.id === product.id);
      if (found) found.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
      persist(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persist(state.items);
    },
    increaseQuantity(state, action) {
      const item = state.items.find((product) => product.id === action.payload);
      if (item) item.quantity += 1;
      persist(state.items);
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((product) => product.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
