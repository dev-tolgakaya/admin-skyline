import { getFirebaseBackend } from "helpers/firebase_helper";
import { postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import { LoginService } from "../../../helpers/services/auth";
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
      const response = await LoginService.loginUser(userData);
      toast.success("Logged In Successfulyy", { autoClose: 2000 });
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history("/dashboard");

      response.then((res) => console.log("res", res));
    } catch (error) {
      toast.error("Project Update Failded", { autoClose: 2000 });
      return error;
    }
  };
// export const loginuser = (user: any, history: any) => async (dispatch: any) => {
//   try {
//     let response: any;
//     // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//     //     let fireBaseBackend = await getFirebaseBackend();
//     //     response = fireBaseBackend.loginUser(
//     //         user.email,
//     //         user.password
//     //     )
//     // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//     //     response = await postJwtLogin({
//     //         user: user.email,
//     //         password: user.password
//     //     })
//     // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//     //     response = await postFakeLogin({
//     //         email: user.email,
//     //         password: user.password
//     //     })
//     //     localStorage.setItem("authUser", JSON.stringify(response));
//     //     dispatch(loginSuccess(response));
//     // }

//     response = await postFakeLogin({
//       userNameOrEmail: user.email,
//       password: user.password,
//       remember: true,
//     });
//     localStorage.setItem("authUser", JSON.stringify(response));
//     dispatch(loginSuccess(response));

//     history("/dashboard");
//   } catch (error) {
//     dispatch(apiError(error));
//   }
// };

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");

    const fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
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
