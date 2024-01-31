import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  isCollpsed: false,
  mainTabArray: null,
  mainTabValue: 1,
};

const GeneralSlice = createSlice({
  name: "General",
  initialState,
  reducers: {
    setIsCollapsed(state, action: PayloadAction<boolean>) {
      state.isCollpsed = action.payload;
    },
    setMainTabArray: (state, action: PayloadAction<any>) => {
      state.mainTabArray = action.payload;
    },
    setMainTabValue: (state, action: PayloadAction<any>) => {
      state.mainTabValue = action.payload;
    },
  },
});

export const { setIsCollapsed, setMainTabArray, setMainTabValue } =
  GeneralSlice.actions;

export default GeneralSlice.reducer;
