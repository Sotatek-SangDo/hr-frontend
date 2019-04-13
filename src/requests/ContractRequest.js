import BaseRequest from './BaseRequest'

export default class ContractRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  store(params) {
    const url = this.parseUrl('/store')
    return this.post(url, params)
  }
  getContractTypies() {
    const url = this.parseUrl('/contract-typies')
    return this.get(url)
  }
  update(params) {
    const url = this.parseUrl('/update')
    return this.post(url, params)
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
  getModel() {
    return '/contracts'
  }
}
