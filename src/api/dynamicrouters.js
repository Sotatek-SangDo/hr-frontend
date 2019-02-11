import request from '@/utils/request'
import store from '@/store'

export function getPermissionByRoles() {
  let data = {}
  if(store.getters && store.getters.roles) {
    data = {
      "roles": store.getters.roles
    };
  }
  
  return request({
    url: '/routers/dynamic',
    method: 'post',
    data
  })
}
