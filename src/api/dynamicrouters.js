import request from '@/utils/request'
import store from '@/store'

export function getPermissionByRoles() {
  return request({
    url: '/routers/dynamic',
    method: 'post',
    data: () => {
      const roles = store.getters && store.getters.roles
      return roles
    }
  })
}
