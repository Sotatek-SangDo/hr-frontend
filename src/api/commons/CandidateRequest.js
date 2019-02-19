import BaseRequest from './BaseRequest'

export default class CandidateRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getList(query = {}) {
    const url = 'get-candidate-recruitment'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'candidates'
  }
}
