import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./thunk";

export interface IInitialState {
  loading: boolean;
  isLoggedIn: boolean;
  loginData: any;
  language: string;
}

export const initialState: IInitialState = {
  loading: false,
  isLoggedIn: false,
  loginData: {},
  language: "tr",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    singOut: (state) => {
      state.isLoggedIn = false;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginData = action.payload;
        localStorage.setItem("authUser", JSON.stringify(action.payload));
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        localStorage.setItem("authUser", JSON.stringify({}));
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, singOut, setLanguage } = loginSlice.actions;
export default loginSlice.reducer;
