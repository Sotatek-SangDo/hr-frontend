import BaseRequest from './BaseRequest'

export default class Nationality extends BaseRequest {
  getAll(params) {
    const url = '/nationalities'
    return this.get(url, params)
  }
}
