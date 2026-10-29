import { createSlice } from '@reduxjs/toolkit';

const readOrders = () => {
  try { return JSON.parse(localStorage.getItem('gaming-orders') || '[]'); }
  catch { return []; }
};
const initialState = { items: readOrders() };
const persist = (items) => {
  try { localStorage.setItem('gaming-orders', JSON.stringify(items)); } catch {}
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder(state, action) {
      state.items.unshift(action.payload);
      persist(state.items);
    },
  },
});
export const { createOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
