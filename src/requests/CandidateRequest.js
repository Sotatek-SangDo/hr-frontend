import BaseRequest from "./BaseRequest";

export default class CandidateRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl("");
    return this.get(url, params);
  }
  getCandidateByRecruitment(params) {
    const url = this.parseUrl("/get-candidate-recruitment");
    return this.get(url, params);
  }
  importExcelData(params) {
    const url = this.parseUrl("/import-data");
    return this.post(url, params);
  }
  store(params) {
    const url = this.parseUrl("/store");
    return this.post(url, params);
  }
  update(params) {
    const url = this.parseUrl("/update");
    return this.post(url, params);
  }
  destroy(params) {
    const url = this.parseUrl("/destroy");
    return this.post(url, params);
  }
  getModel() {
    return "/candidates";
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`;
  }
}
