import BaseRequest from './BaseRequest'

export default class DepartmentRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    return this.rq(url, this.getMethod(), query)
  }
  getList(query = {}) {
    const url = 'get-list'
    return this.rq(url, this.getMethod(), query)
  }
  update(query) {
    const url = 'update'
    return this.rq(url, this.postMethod(), query)
  }
  store(query) {
    const url = 'store'
    return this.rq(url, this.getMethod(), query)
  }
  destroy(query) {
    const url = 'destroy'
    return this.rq(url, this.postMethod(), query)
  }
  getModel() {
    return 'departments'
  }
}
