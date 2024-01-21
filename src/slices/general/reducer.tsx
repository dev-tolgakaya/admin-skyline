import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isCollpsed: false,
};

const GeneralSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setIsCollapsed(state, action) {
      state.isCollpsed = action.payload;
    },
  },
});

export const {
    setIsCollapsed
} = GeneralSlice.actions

export default GeneralSlice.reducer;