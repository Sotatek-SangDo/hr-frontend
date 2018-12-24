import BaseRequest from "./BaseRequest";

export default class UserRequest extends BaseRequest {
  login(params) {
    const url = "/login";
    return this.post(url, params);
  }
}
