import BaseRequest from './BaseRequest'

export default class AuthRequest extends BaseRequest {
  getModel() {
    return 'user'
  }
}
