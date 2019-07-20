import request from '@/utils/request'

const METHOD = {
  GET: 'get',
  POST: 'post'
}

export default class BaseRequest {
  rq(url, methodType, queryParams = {}) {
    if (methodType === METHOD.GET) {
      return request({
        url: this.parseUrl(url),
        method: methodType,
        params: queryParams
      })
    }
    return request({
      url: this.parseUrl(url),
      method: methodType,
      data: queryParams
    })
  }
  parseUrl(url = '') {
    return url ? `${this.getModel()}/${url}` : `${this.getModel()}`
  }
  getMethod() {
    return METHOD.GET
  }
  postMethod() {
    return METHOD.POST
  }
  requestPost(url, query = {}) {
    const request = this.rq(url, this.postMethod(), query)
    return request
  }
  store(query = {}) {
    const url = 'store'
    return this.requestPost(url, query)
  }
  update(query = {}) {
    const url = 'update'
    return this.requestPost(url, query)
  }
  destroy(query = {}) {
    const url = 'destroy'
    return this.requestPost(url, query)
  }
}
