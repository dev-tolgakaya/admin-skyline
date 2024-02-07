import API from "../../api";
import mock from "helpers/api/mockData";

mock.onPost("/api/v1/identity/login").reply(200, {
  authUser: {
    firstName: "sercan",
    lastName: "kaya",
    userName: "sercankaya22",
    phoneNumber: "122335345345435",
    confirmPassword: "123456789",
    roles: ["user"],
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
});
mock.onPost("/api/v1/identity/logout").reply(200, {});

const loginUser = async (data: any): Promise<any> => {
  const res = await API.post("/api/v1/identity/login", data);
  return res?.data;
};

const logoutUser = async (data: any): Promise<any> => {
  const res = await API.post("/api/v1/identity/logout", data);
  return res;
};

export const AuthService = {
  loginUser,
  logoutUser,
};
