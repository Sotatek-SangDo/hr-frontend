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
  update(query) {
    const url = 'update'
    const request = this.rq(url, this.postMethod(), query)
    return request
  }
  store(query) {
    const url = 'store'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  destroy(query) {
    const url = 'destroy'
    const request = this.rq(url, this.postMethod(), query)
    return request
  }
  getModel() {
    return 'employees'
  }
}
