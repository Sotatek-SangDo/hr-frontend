import BaseRequest from "./BaseRequest";

export default class EmployeeRequest extends BaseRequest {
  getAll(params) {
    const url = "/employees";
    return this.get(url, params);
  }
  store(params) {
    const url = "/employees/store";
    return this.post(url, params);
  }
}
