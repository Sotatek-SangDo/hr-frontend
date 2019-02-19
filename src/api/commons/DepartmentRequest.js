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
  getModel() {
    return 'departments'
  }
}
