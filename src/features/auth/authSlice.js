import { createSlice } from '@reduxjs/toolkit';

const readUser = () => {
  try { return JSON.parse(localStorage.getItem('gaming-user') || 'null'); }
  catch { return null; }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: readUser(), isAuthenticated: Boolean(readUser()) },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      try { localStorage.setItem('gaming-user', JSON.stringify(action.payload)); } catch {}
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      try { localStorage.removeItem('gaming-user'); } catch {}
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
