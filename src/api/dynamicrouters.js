import request from '@/utils/request'

export function getDynamicRouter() {
  return request({
    url: '/routers/dynamic',
    method: 'get'
  })
}