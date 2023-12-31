import { getFirebaseBackend } from "helpers/firebase_helper";
import { AuthService } from "../../../helpers/services/auth";
import {
  loginSuccess,
  apiError,
  logoutUserSuccess,
  resetLoginFlag,
  openLoading,
  closeLoading,
} from "./reducer";
import { toast } from "react-toastify";
import i18n from "../../../i18n";

export const loginuser =
  (userData: any, history: any) => async (dispatch: any) => {
    dispatch(openLoading());
    try {
      const response = await AuthService.loginUser(userData);
      if (response) {
        dispatch(closeLoading());
        toast.success(i18n.t("ToastMessages.Auth.LoginSuccess"), {
          autoClose: 2000,
        });
        localStorage.setItem("authUser", JSON.stringify(response));
        dispatch(loginSuccess(response));
        history("/dashboard");
      }
    } catch (error: any) {
      dispatch(closeLoading());
      toast.error(error, { autoClose: 2000 });
      return error;
    }
  };

export const logoutUser = (navigate: any) => async (dispatch: any) => {
  dispatch(openLoading());
  try {
    const response = await AuthService.logoutUser({});
    if (response) {
      toast.success(i18n.t("ToastMessages.Auth.LogoutSucces"), {
        autoClose: 2000,
      });
      dispatch(closeLoading());
      localStorage.removeItem("authUser");
      dispatch(logoutUserSuccess());
      navigate("/login");
    }
  } catch (error) {
    dispatch(closeLoading());
    dispatch(apiError(error));
  }
  dispatch(closeLoading());
};

export const resetLoginMsgFlag = () => {
  try {
    const response = resetLoginFlag();
    return response;
  } catch (error) {
    return error;
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response: any;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }

      const socialdata = await response;
      if (socialdata) {
        sessionStorage.setItem("authUser", JSON.stringify(socialdata));
        dispatch(loginSuccess(socialdata));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };
