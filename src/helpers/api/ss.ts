// import axios from "axios";
// import https from "https";

// import mockData from "./mockData/index";
// const mockDataList: string[] = (process.env.MOCK_DATA || "").split(",");
// const consoleLogDisable: boolean = !!process.env.CONSOLE_LOG_DISABLE;

// const getMockData = (url: string): any => {
//   let result: any;
//   mockDataList
//     .filter((p) => p)
//     .map((path) => {
//       if (url.includes(path)) {
//         result = mockData[path] || { error: "Mock data not found!" };
//       }
//     });
//   return result;
// };

// const apiURL: any = process.env;

// axios.defaults.timeout = 1000 * 60 * 30; // 30 dakika
// axios.defaults.validateStatus = (status: number) => {
//   return status >= 200 && status < 400;
// };

// axios.interceptors.response.use(
//   (response: any) => {
//     return response;
//   },
//   function (error: any) {
//     return Promise.reject(error);
//   }
// );

// class API {
//   constructor() {
//     //empty constructor
//   }

//   makeHeaders({ token, BEServiceType }: { token: string; BEServiceType: number }): any {
//     const fileStorageToken: string =
//       "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIwIiwiVXNlck5hbWUiOiJIYW5nZmlyZSIsIkxhbmd1YWdlQ29kZSI6InRyIiwiQ29tcGFueUlkIjoiMSIsIlJldGFpbGVySWQiOiIwIiwiUmV0YWlsZXJEaXZpc2lvbklkIjoiMSIsIm5iZiI6MTY0MzExNjc3MSwiZXhwIjoxOTYyMTkxOTI2fQ.7nls14GeFeWqFHtlVDNUXoGiNIYZFQKNIS9dbVUyWGw";
//     const headers: any = {};
//     if (BEServiceType === 4) {
//       headers.Authorization = `Bearer ${fileStorageToken}`;
//     } else {
//       headers.AuthToken = `${token}`;
//     }
//     return headers;
//   }

//   fetch(requestConfig: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       try {
//         let {
//           url,
//           method,
//           data,
//           token,
//           BEServiceType,
//           consoleLogDisabledRequest,
//         } = requestConfig;
//         let mockDataObject: any = getMockData(url);
//         if (typeof mockDataObject === "function") {
//           mockDataObject = mockDataObject(data);
//         }
//         if (mockDataObject) {
//           if (mockDataObject.error) return reject(mockDataObject);
//           return resolve(mockDataObject);
//         }

//         const decidedUrl = () => {
//           switch (BEServiceType) {
//             case 1:
//               return apiURL.BACKEND_HOSTNAME_URL;
//             case 2:
//               return apiURL.CLAIM_HOSTNAME_URL;
//             case 4:
//               return apiURL.FILE_STORAGE_URL;
//             case 3:
//               return apiURL.SMS_HOSTNAME_URL;
//             default:
//               return apiURL.BACKEND_HOSTNAME_URL;
//           }
//         };

//         const axiosConfig: any = {
//           method: method || "GET",
//           url: decidedUrl() + url,
//           data: data || null,
//           headers: this.makeHeaders({ token, BEServiceType }),
//           httpsAgent: new https.Agent({ rejectUnauthorized: false }), // ssl hatalarını ignore etmek için
//           maxContentLength: Infinity,
//           maxBodyLength: Infinity,
//         };
//         // console log datası üretmek için finallyData
//         let finallyData: any = {
//           request: Object.assign({}, axiosConfig),
//           results: {},
//         };
//         // güvenlik gerekçesi ile headers siliniyor. token falan gizli tutmak için.
//         delete finallyData.request.headers;
//         delete finallyData.request.httpsAgent;

//         axios(axiosConfig)
//           .then((response: any) => {
//             if (response.data) {
//               if (response.data.IsSuccess) {
//                 response.data.StatusCode = 200;
//               }
//               finallyData.results = {
//                 fStatus: `then response data - ${response.status} - core:status:${response.data.IsSuccess}`,
//                 fData: response.data,
//               };

//               if (
//                 response.status !== 200 ||
//                 !(
//                   (response.data || {}).IsSuccess ||
//                   (response.data || {}).isSuccess ||
//                   (response.data || {}).statusCode === 200
//                 )
//               ) {
//                 //TODO burasi degisecek quota apisi icin
//                 const vError = response.data.ValidationErrors
//                   ? response.data.ValidationErrors.join(", ")
//                   : null;
//                 const resErrors = (response.data.errors || []).join(", ");

//                 const errorData =
//                   vError ||
//                   response.data.exceptionMessage ||
//                   response.data?.ResultData?.Message ||
//                   response?.data?.ResultMessage ||
//                   resErrors ||
//                   "core error - api hatası";

//                 finallyData.results.fError = errorData;

//                 reject({
//                   status: response.status === 200 ? 380 : response.status,
//                   error: errorData,
//                   data: { scope: "core-api", ...response.data },
//                 });
//               } else {
//                 resolve(response.data);
//               }
//             } else {
//               finallyData.results = {
//                 fStatus: `then response - ${response.status}`,
//                 fData: response,
//                 fError: "response data undefined",
//               };
//               reject({
//                 status: 399,
//                 error: "response data undefined",
//                 data: { scope: "core-api", ...response },
//               });
//             }
//           })
//           .catch((err: any) => {
//             const errorResponse = err.response || {};
//             const resErrors = (errorResponse.data?.errors || []).join(", ");
//             const resData = errorResponse.data || { error: err.message };
//             const eData = {
//               status: errorResponse.status || 399,
//               data: errorResponse.data || {
//                 error: err.message,
//                 scope: "serverApp-api",
//               },
//               error: resData.ResultMessage || resData.error || resErrors,
//             };
//             finallyData.results = {
//               fStatus: `catch response - ${eData.status}`,
//               fData: eData.data,
//               fError: eData.error,
//             };
//             reject(eData);
//           })
//           .finally(() => {
//             if (consoleLogDisable || consoleLogDisabledRequest) return;
//             try {
//               // IMPORTANT: buraya sentry yüklenebilir. errorlar global olarak görebilmek için.
//               // console.warn(JSON.stringify(finallyData));
//             } catch (error) {
//               console.warn("finally error parse : ", finallyData);
//             }
//           });
//       } catch (error) {
//         reject({
//           status: 399,
//           error: "API - Teknik bir hata oluştu!",
//         });
//         console.error(
//           "Api Fetch Error - nodeServer : ",
//           error,
//           " - message : ",
//           error?.message
//         );
//       }
//     });
//   }
// }
// export default new API();