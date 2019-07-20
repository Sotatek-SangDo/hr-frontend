import BaseRequest from './BaseRequest'

export default class DependentsRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getEDependents(query = {}) {
    const url = 'get-eDependents'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'dependents'
  }
}
