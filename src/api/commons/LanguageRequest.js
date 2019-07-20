import BaseRequest from './BaseRequest'

export default class LanguageRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'languages'
  }
}
