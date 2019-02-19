import BaseRequest from './BaseRequest'

export default class EducationRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getEmployeeEducation(query = {}) {
    const url = 'get-eEducation'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'educations'
  }
}
