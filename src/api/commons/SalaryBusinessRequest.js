import BaseRequest from './BaseRequest'

export default class SalaryBusinessRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getSalaryBusiness(query = {}) {
    const url = 'get-salary-business'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getModel() {
    return '/salary-business'
  }
}
