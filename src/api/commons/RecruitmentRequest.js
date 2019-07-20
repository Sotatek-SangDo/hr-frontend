import BaseRequest from './BaseRequest'

export default class InsuranceRequest extends BaseRequest {
  getList(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getAll(query = {}) {
    const url = 'list'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'recruitments'
  }
}
