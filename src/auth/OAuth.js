import { authPasswordFlowConfig, defaultString } from './config'
import axios from 'axios'
import EventBus from '../event-bus'
import $ from 'jquery'
import { getHeaderToken, getRefreshToken } from '@/utils/auth'

export default {
  loginByUserPass(userInfor = {}) {
    const options = {
      method: defaultString.METHOD_POST,
      url: defaultString.token_endpoint,
      data: $.param({
        grant_type: authPasswordFlowConfig.grant_type,
        scope: authPasswordFlowConfig.scope,
        username: userInfor.username,
        password: userInfor.password,
        client_id: authPasswordFlowConfig.clientId,
        client_secret: authPasswordFlowConfig.ClientSecret
      })
    }
    return new Promise((resolve, reject) => {
      this.req(options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
  getTokenFromRefreshToken() {
    const options = {
      method: defaultString.METHOD_POST,
      url: defaultString.token_endpoint,
      data: $.param({
        grant_type: authPasswordFlowConfig.grant_refresh_token,
        scope: authPasswordFlowConfig.scope,
        refresh_token: getRefreshToken(),
        client_id: authPasswordFlowConfig.clientId,
        client_secret: authPasswordFlowConfig.ClientSecret
      })
    }
    return new Promise((resolve, reject) => {
      this.req(options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
  getUserInfo() {
    const options = {
      method: defaultString.METHOD_GET,
      url: defaultString.userInfor_endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getHeaderToken()
      }
    }
    return new Promise((resolve, reject) => {
      this.req(options)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  req(options) {
    return new Promise((resolve, reject) => {
      axios(options)
        .then(res => resolve(res))
        .catch(err => this._errorHandler(reject, err))
    })
  },
  _errorHandler(reject, err) {
    // window.app.$broadcast('EVENT_COMMON_ERROR', err);
    if (err.response && err.response.status === 401) {
      // window.location.reload();
    }
    if (err.response && err.response.status === 503) {
      // window.location.reload();
    }
    if (err.response && err.response.status === 400) {
      EventBus.$emit('errors', { type: 'request_auth', error: err.message })
    }
    return reject(err)
  },

}
