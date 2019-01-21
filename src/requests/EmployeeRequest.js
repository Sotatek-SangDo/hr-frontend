import BaseRequest from './BaseRequest'

export default class EmployeeRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  store(params) {
    const url = this.parseUrl('/store')
    return this.post(url, params)
  }
  getEmpFullInfo(params) {
    const url = this.parseUrl('/full-info')
    return this.get(url, params)
  }
  update(params) {
    const url = this.parseUrl('/update')
    return this.post(url, params)
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
  getModel() {
    return '/employees'
  }
}
