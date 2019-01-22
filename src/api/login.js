import request from '@/utils/request'

var OAuth2 = require('../auth/oauth2.js').OAuth2;

var clientID = 'hrm-resource-server';
var clientSecret = 'gJ7t7czenNY8WZEdSAe8ZbKd9MpUhc3S';
var scope = 'openid offline_access email profile roles hrm';
var oauth2 = new OAuth2(clientID,
                        clientSecret,
                        'http://auth.erptech.vn/', 
                        'connect/authorize',
                        'connect/token',
                        null); /** Custom headers */

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }

  return oauth2.getOAuthAccessToken(
       'password',
       {'username': username, 'password': password, 'scope': scope},
       function (e, access_token, refresh_token, results){
       console.log('bearer: ',access_token);
     });

  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

