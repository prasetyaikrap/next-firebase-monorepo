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
        user: UserData;
        idToken: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.idToken = action.payload.idToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.idToken = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
