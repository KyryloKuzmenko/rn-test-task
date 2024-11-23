import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// User object
interface User {
  name: string;
  email: string;
  password: string;
}

//authentication state
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

// Create a slice for handling authentication actions and state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

// Configure the store, passing the reducer for the auth slice
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
