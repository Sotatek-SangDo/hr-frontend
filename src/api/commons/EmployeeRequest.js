import BaseRequest from './BaseRequest'

export default class EmployeeRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getList(query = {}) {
    const url = 'get-list'
    const request = this.rq(url, this.getMethod(), query = {})
    return request
  }
  getEmployee(query = {}) {
    const url = 'get-employee'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getFullInfo(query = {}) {
    const url = 'full-info'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'employees'
  }
}
