import BaseRequest from './BaseRequest'

export default class AuthRequest extends BaseRequest {
  forgotPassword(params = {}) {
    const url = 'forgot-password'
    const request = this.rq(url, this.postMethod(), params)
    return request
  }
  getModel() {
    return 'user'
  }
}
