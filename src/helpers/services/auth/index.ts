import { API } from "../../api";
const api = new API();

export class LoginService {
  public static loginUser(data: any) {
    return api.POST("api/v1/identity/login", data);
  }
}
