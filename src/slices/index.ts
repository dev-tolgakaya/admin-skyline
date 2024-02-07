import { combineReducers } from "redux";
import CalendarReducer from "./calendar/reducer";
import LayoutReducer from "./layouts/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import AccountReducer from "./auth/register/reducer";
import GenaralReducer from "./general/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  calendar: CalendarReducer,
  Login: LoginReducer,
Profile: ProfileReducer,
  ForgetPassword: ForgotPasswordReducer,
  Account: AccountReducer,
  General: GenaralReducer,
});

export default rootReducer;
