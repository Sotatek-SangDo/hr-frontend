import BaseRequest from './BaseRequest'

export default class JobRequest extends BaseRequest {
  getAll(params) {
    const url = '/jobs'
    return this.get(url, params)
  }
}
