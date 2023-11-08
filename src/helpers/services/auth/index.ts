import { API } from "../../api";
const api = new API();

export class AuthService {
  public static loginUser(data: any) {
    return api.POST("api/v1/identity/login", data);
  }
  public static logoutUser(data: any) {
    return api.POST("api/v1/identity/logout", data);
  }
}


