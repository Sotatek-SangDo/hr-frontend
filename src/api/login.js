import request from '@/utils/request'
import Oauth2 from '@/auth/OAuth'

export function loginByUsername(userInfo) {
  return Oauth2.loginByUserPass(userInfo)
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return Oauth2.getUserInfo()
}

