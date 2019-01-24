import BaseRequest from './BaseRequest'

export default class CompanyRequest extends BaseRequest {
  getComFullContact() {
    const url = '/company'
    return this.get(url)
  }
}
