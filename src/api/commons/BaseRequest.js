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
      queryParams
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
}
