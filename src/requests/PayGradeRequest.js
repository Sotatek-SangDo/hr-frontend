import BaseRequest from "./BaseRequest";

export default class PayGradeRequest extends BaseRequest {
  getAll(params) {
    const url = "/pay-grade";
    return this.get(url, params);
  }
}
