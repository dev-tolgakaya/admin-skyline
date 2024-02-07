import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const getToken = (): string | undefined => {
  return (
    JSON.parse(localStorage.getItem("authUser") || "{}")?.accessToken || null
  );
};

export const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 60000, // 60 seconds timeout for all requests
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (!!token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
    config.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization";

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.exception) {
      throw response.data.exception;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // if (
    //   (error?.response?.status === 401 ||
    //     error.response?.data?.exception?.errorCode ===
    //       Auth.errorCodeRequiresRefreshToken) &&
    //   !originalRequest._retry &&
    //   originalRequest.url !== apiURL// RequiresRefreshToken errorCode should not fired from refresh token api call , but it does!
    // ) {
    //   originalRequest._retry = true;
    //   try {
    //     const refreshRequest = {} as PostRefreshTokenRequestModel;
    //     refreshRequest.refreshToken =
    //       localStorage.getItem(Auth.refreshToken) || "";
    //     refreshRequest.username = localStorage.getItem(Auth.userName) || "";
    //     const originalBaseURL = http.defaults.baseURL; // preserve baseURL. Refresh token service changes it!
    //     const response = await postRefreshToken(refreshRequest);
    //     http.defaults.baseURL = originalBaseURL;
    //     const { access_token, refresh_token } = response;
    //     localStorage.setItem(Auth.accessToken, access_token || "");
    //     localStorage.setItem(Auth.refreshToken, refresh_token || "");
    //     return http(originalRequest);
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // }
    return Promise.reject(error);
  }
);
const API = axiosInstance;

export default API;
