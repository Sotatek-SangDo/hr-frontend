import BaseRequest from './BaseRequest'

export default class InsurancePaymentRequest extends BaseRequest {
  getList(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getAll(query = {}) {
    const url = 'get-list'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'insurance-payment'
  }
}
