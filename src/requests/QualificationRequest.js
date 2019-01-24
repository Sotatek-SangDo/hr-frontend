import BaseRequest from './BaseRequest'

export default class QualificationRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  getModel() {
    return '/qualifications'
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
}
