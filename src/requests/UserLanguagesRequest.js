import BaseRequest from './BaseRequest'

export default class UserLanguagesRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  getELanguages(params) {
    const url = this.parseUrl('/get-eLanguage')
    return this.get(url, params)
  }
  store(params) {
    const url = this.parseUrl('/store')
    return this.post(url, params)
  }
  update(params) {
    const url = this.parseUrl('/update')
    return this.post(url, params)
  }
  destroy(params) {
    const url = this.parseUrl('/destroy')
    return this.post(url, params)
  }
  getModel() {
    return '/user-languages'
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
}
