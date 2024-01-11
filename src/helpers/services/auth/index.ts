import API from "../../api";

const loginUser = async (data: any): Promise<any> => {
  const res = await API().post("/api/v1/identity/login", data);
  return res?.data;
};

const logoutUser = async (data: any): Promise<any> => {
  const res = await API().post("/api/v1/identity/logout", data);
  return res;
};

export const AuthService = {
  loginUser,
  logoutUser,
};
