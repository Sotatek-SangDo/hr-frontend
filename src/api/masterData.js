import request from '@/utils/request'

export function getMasterData() {
  return request({
    url: 'master-data',
    method: 'get'
  })
}
