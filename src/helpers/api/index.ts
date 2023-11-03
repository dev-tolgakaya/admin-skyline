import axios from "axios";

const axiosApiInstance = axios.create();

// default
const baseURL = process.env.REACT_APP_API_GATEWAY;

axiosApiInstance.interceptors.request.use(
  function (config) {
    config.headers!["Accept-Language"] = "tr";
    config.headers!["Content-Type"] = "application/json; charset=utf-8";
    config.headers!["Access-Control-Allow-Origin"] = "*";
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// content type
// let authUser: any = (localStorage.getItem("authUser"));

// intercepting to capture errors
axiosApiInstance.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message: any;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
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
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axiosApiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class API {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
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
  /**
   * post given data to url
   */
  POST = (url: any, data: any) => {
    console.log("data", data);
    console.log("baseURL", baseURL + "/" + url);
    return axiosApiInstance.post(baseURL + "/" + url, data, {
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };
  /**
   * Updates data
   */
  PUT = (url: any, data: any) => {
    return axiosApiInstance.patch(baseURL + "/" + url, data);
  };

  put = (url: any, data: any) => {
    return axiosApiInstance.put(baseURL + "/" + url, data);
  };
  /**
   * Delete
   */
  DELETE = (url: any, config: any) => {
    return axiosApiInstance.delete(baseURL + "/" + url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { API, setAuthorization, getLoggedinUser };
