import axios from "axios";

const axiosApiInstance = axios.create();

const baseURL = process.env.REACT_APP_API_GATEWAY;

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const authObj = localStorage.getItem("authUser");
const parsedAuthObj = authObj ? JSON.parse(authObj) : null;

axiosApiInstance.interceptors.request.use(
  function (config) {
    config.headers!["Accept-Language"] = "tr";
    config.headers!["Content-Type"] = "application/json; charset=utf-8";
    config.headers!["Access-Control-Allow-Origin"] = "*";
    config.headers!["Authorization"] = "Bearer " + parsedAuthObj?.accessToken;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);


axiosApiInstance.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (error: any) {
    console.log("error", error);
    let message: any;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 403:
        message = "Hatalı kullanıcı adı veya şifre";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

const setAuthorization = (token: any) => {
  axiosApiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class API {
  GET = (url: any, params: any) => {
    let response: any;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axiosApiInstance.get(
        `${baseURL + "/" + url}?${queryString}`,
        params
      );
    } else {
      response = axiosApiInstance.get(`${baseURL + "/" + url}`, params);
    }

    return response;
  };

  POST = (url: any, data: any) => {
    return axiosApiInstance.post(baseURL + "/" + url, data);
  };

  PUT = (url: any, data: any) => {
    return axiosApiInstance.patch(baseURL + "/" + url, data);
  };
  DELETE = (url: any, config: any) => {
    return axiosApiInstance.delete(baseURL + "/" + url, { ...config });
  };
}

export { API, setAuthorization, getLoggedinUser };
