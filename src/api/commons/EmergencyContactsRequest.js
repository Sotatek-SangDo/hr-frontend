import BaseRequest from './BaseRequest'

export default class EmergencyContactsRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getEEmergencyContact(query = {}) {
    const url = 'get-eEmergency-contact'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'emergency-contacts'
  }
}
