import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// Auth
import Login from "pages/Authentication/login";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import SignUp from "pages/Authentication/Register";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  //calendar
  { path: "/calendar", component: <Calendar /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <SignUp /> },
];
export { authProtectedRoutes, publicRoutes };
