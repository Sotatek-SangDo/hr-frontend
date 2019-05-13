import BaseRequest from './BaseRequest'

export default class SalaryRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getSalary(query = {}) {
    const url = 'get-salary'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getModel() {
    return '/salaries'
  }
}
