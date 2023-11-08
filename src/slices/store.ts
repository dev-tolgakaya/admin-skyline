import rootReducer from "./index";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default appStore;
