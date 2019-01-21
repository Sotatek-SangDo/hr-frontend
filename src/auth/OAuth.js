import { authPasswordFlowConfig, defaultString } from './config'
import axios from 'axios'
import EventBus from '../event-bus'
import $ from 'jquery'

export default {
  getAuthConfig() {
    const defaultTime = 60 * 1000 * 60 * 2
    const options = {
      method: defaultString.METHOD_GET,
      url: defaultString.url_config
    }
    if (localStorage.getItem('authConfig')) {
      setInterval(() => {
        this.req(options).then(res => localStorage.setItem('authConfig', res))
      }, defaultTime)
    } else {
      this.req(options).then(res => localStorage.setItem('authConfig', res))
    }
  },
  getToken(userInfor = {}) {
    const options = {
      method: defaultString.METHOD_POST,
      url: defaultString.token_endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $.param({
        grant_type: authPasswordFlowConfig.grant_type,
        scope: authPasswordFlowConfig.scope,
        username: userInfor.email,
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
  req(options) {
    return new Promise((resolve, reject) => {
      axios(options)
        .then(res => resolve(res))
        .catch(err => this._errorHandler(reject, err))
    })
  },
  getInforAuth() {
    return localStorage.getItem('authConfig')
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
  }
}
