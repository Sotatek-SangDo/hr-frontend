import BaseRequest from './BaseRequest'

export default class SkillUserRequest extends BaseRequest {
  getAll(params) {
    const url = this.parseUrl('')
    return this.get(url, params)
  }
  store(params) {
    const url = this.parseUrl('/store')
    return this.post(url, params)
  }
  getEmpSkill(params) {
    const url = this.parseUrl('/get-emp-skill')
    return this.get(url, params)
  }
  update(params) {
    const url = this.parseUrl('/update')
    return this.post(url, params)
  }
  destroy(params) {
    const url = this.parseUrl('/destroy')
    return this.post(url, params)
  }
  getModel() {
    return '/skill-user'
  }
  parseUrl(url) {
    return `${this.getModel()}${url}`
  }
}
