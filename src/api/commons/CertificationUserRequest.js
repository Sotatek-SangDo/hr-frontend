import BaseRequest from './BaseRequest'

export default class CertificationUserRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getECertification(query = {}) {
    const url = 'get-eCertification'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'certifications-user'
  }
}
