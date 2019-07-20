import BaseRequest from './BaseRequest'

export default class EmployeeStatusRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query = {})
    return request
  }
  getList(query = {}) {
    const url = 'get-list'
    const request = this.rq(url, this.getMethod(), query = {})
    return request
  }
  getModel() {
    return 'employee-status'
  }
}
