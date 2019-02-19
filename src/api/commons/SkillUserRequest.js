import BaseRequest from './BaseRequest'

export default class SkillUserRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getEmpSkill(query = {}) {
    const url = 'get-emp-skill'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }
  getModel() {
    return 'skill-user'
  }
}

