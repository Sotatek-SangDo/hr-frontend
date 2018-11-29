import BaseRequest from "./BaseRequest";

export default class SkillUserRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl("");
    return this.get(url, params);
  }
  store(params) {
    const url = this.parseUrl("/store");
    return this.post(url, params);
  }
  getModel() {
    return "/skill-user";
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`;
  }
}
