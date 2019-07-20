import BaseRequest from './BaseRequest'

export default class JobRequest extends BaseRequest {
  getList(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query = {})
    return request
  }
  getModel() {
    return 'pay-grade'
  }
}
