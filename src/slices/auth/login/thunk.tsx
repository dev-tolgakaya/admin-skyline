import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "helpers/services/auth";
import { toast } from "react-toastify";
import i18n from "../../../i18n";
import handleError from "helpers/error/handleError";

const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ data, navigate }: { data: any; navigate: any }) => {
    try {
      const res = await AuthService.loginUser(data);
      toast.success(i18n.t("ToastMessages.Auth.LoginSuccess"), {
        autoClose: 2000,
      });
      if (res?.authUser?.accessToken) navigate("/dashboard");
      return res;
    } catch (ex: any) {
      handleError(ex, true);
      throw ex;
    }
  }
);

const logoutUser = createAsyncThunk("login/LogoutUser", async (data: any) => {
  try {
    const res = await AuthService.logoutUser(data);
    return res;
  } catch (ex: any) {
    handleError(ex, true);
    throw ex;
  }
});

export { loginUser, logoutUser };

