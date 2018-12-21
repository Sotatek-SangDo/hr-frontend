import BaseRequest from "./BaseRequest";

export default class LanguagesRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl("");
    return this.get(url, params);
  }
  getModel() {
    return "/languages";
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`;
  }
}
