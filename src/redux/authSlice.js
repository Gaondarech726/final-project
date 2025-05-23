import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  users: [],
  currentUser: userFromStorage || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action) {
      const existing = state.users.find(
        (user) => user.username === action.payload.username
      );

      if (existing) {
        state.error = "Username already exists";
      } else {
        state.users.push(action.payload);
        state.error = null;
      }
    },

    logining(state, action) {
      const user = state.users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      } else {
        state.error = "Invalid data";
      }
    },

    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    // ✅ ДОДАНО updateBalance
    updateBalance(state, action) {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          balance: action.payload,
        };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const { register, logining, logout, updateBalance, clearError } =
  authSlice.actions;
export default authSlice.reducer;
