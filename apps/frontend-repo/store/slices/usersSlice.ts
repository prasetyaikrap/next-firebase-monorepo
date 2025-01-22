import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@repo/shared/src/types/userType.js";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  idToken: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  idToken: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        idToken: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.idToken = action.payload.idToken;
    },
    setUser: (
      state,
      action: PayloadAction<{
        user: UserData | null;
      }>
    ) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.idToken = null;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
