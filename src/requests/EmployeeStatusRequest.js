import BaseRequest from "./BaseRequest";

export default class EmployeeStatusRequest extends BaseRequest {
  getAll(params) {
    const url = "/employee-status";
    return this.get(url, params);
  }
}
