import BaseRequest from './BaseRequest'

export default class SkillRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  getModel() {
    return '/skills'
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
}
