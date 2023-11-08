import { getFirebaseBackend } from "helpers/firebase_helper";
import { postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import { AuthService } from "../../../helpers/services/auth";
import {
  loginSuccess,
  apiError,
  logoutUserSuccess,
  resetLoginFlag,
} from "./reducer";
import { toast } from "react-toastify";

export const loginuser =
  (userData: any, history: any) => async (dispatch: any) => {
    try {
      const response = await AuthService.loginUser(userData);
      if (response) {
        toast.success("Logged In Successfulyy", { autoClose: 2000 });
        localStorage.setItem("authUser", JSON.stringify(response));
        dispatch(loginSuccess(response));
        history("/dashboard");
      }
    } catch (error) {
      toast.error("Project Update Failded", { autoClose: 2000 });
      return error;
    }
  };

export const logoutUser = (navigate: any) => async (dispatch: any) => {
  try {
    const response = await AuthService.logoutUser({});
    if (response) {
      toast.success("Logged Out Successfulyy", { autoClose: 2000 });
      localStorage.removeItem("authUser");
      dispatch(logoutUserSuccess());
      navigate("/login")
    }
  } catch (error) {
    dispatch(apiError(error));
  }
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
