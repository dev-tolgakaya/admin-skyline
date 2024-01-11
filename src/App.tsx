import React, { useMemo } from "react";
import "./App.css";
import { authProtectedRoutes, publicRoutes } from "./Routes/allRoutes";
import { Route, Routes } from "react-router-dom";
import VerticalLayout from "./Layouts/VerticalLayout";
import "./assets/scss/theme.scss";
import NonAuthLayout from "./Layouts/NonLayout";
import { ToastContainer } from "react-toastify";

//constants
import { LAYOUT_TYPES } from "./Components/constants/layout";

import fakeBackend from "./helpers/AuthType/fakeBackend";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import AuthProtected from "Routes/AuthProtected";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Spinners from "Components/Common/Spinner";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import appStore from "slices/store";
fakeBackend();
const getLayout = (layoutType: any) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case LAYOUT_TYPES.VERTICAL:
      Layout = VerticalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const persistor = persistStore(appStore);

function App() {
  const selectLeadData = createSelector(
    (state: any) => state.Layout,
    (layoutTypes) => layoutTypes
  );
  const { layoutTypes } = useSelector(selectLeadData);
  const { loading } = useSelector((state: any) => state.Login);

  const Loading = useMemo(() => <Spinners />, [loading]);
  if (loading) return Loading;

  const Layout = getLayout(layoutTypes);
  return (
    <I18nextProvider i18n={i18n}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={
                <AuthProtected>
                  <Layout>{route.component}</Layout>
                </AuthProtected>
              }
            />
          ))}
        </Routes>
      </PersistGate>
    </I18nextProvider>
  );
}

export default App;
