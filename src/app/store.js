import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});
