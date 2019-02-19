import BaseRequest from './BaseRequest'

export default class QualificationRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    return this.rq(url, this.getMethod(), query)
  }
  getModel() {
    return 'qualifications'
  }
}
