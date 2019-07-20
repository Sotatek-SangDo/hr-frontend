import BaseRequest from './BaseRequest'

export default class InterviewRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getList(query = {}) {
    const url = 'all'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'interviews'
  }
}
