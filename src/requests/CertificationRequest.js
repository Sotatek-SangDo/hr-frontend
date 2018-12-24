import BaseRequest from "./BaseRequest";

export default class CertificationRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl("");
    return this.get(url, params);
  }
  getModel() {
    return "/certifications";
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`;
  }
}
