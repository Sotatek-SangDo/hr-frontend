import request from '@/utils/request'
import Oauth2 from '@/auth/OAuth'

export function loginByUsername(userInfo) {
  return Oauth2.loginByUserPass(userInfo)

  // Using this mock if you don't have network
  // return request({
  //   url: '/login/login',
  //   method: 'post'
  // })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return Oauth2.getUserInfo()

  // Using this mock if you don't have network
  // return request({
  //   url: '/user/info',
  //   method: 'get'
  // })
}

