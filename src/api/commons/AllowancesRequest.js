import BaseRequest from './BaseRequest'

export default class AllowancesRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getAllowances(query = {}) {
    const url = 'get-allowances'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getModel() {
    return '/allowances'
  }
}
