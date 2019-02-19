import BaseRequest from './BaseRequest'

export default class UserLanguagesRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getELanguages(query = {}) {
    const url = 'get-eLanguage'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'user-languages'
  }
}
