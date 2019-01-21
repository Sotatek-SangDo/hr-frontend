import { authPasswordFlowConfig, defaultString } from "./config";
import axios from "axios";
import EventBus from "../event-bus";
import $ from "jquery";
import auth from "../auth";
export default {
  getAuthConfig() {
    const defaultTime = 60 * 1000 * 60 * 2;
    const options = {
      method: defaultString.METHOD_GET,
      url: defaultString.url_config
    };
    if (localStorage.getItem("authConfig")) {
      setInterval(() => {
        this.req(options).then(res => localStorage.setItem("authConfig", res));
      }, defaultTime);
    } else {
      this.req(options).then(res => localStorage.setItem("authConfig", res));
    }
  },
  getToken(userInfor = {}) {
    const options = {
      method: defaultString.METHOD_POST,
      url: defaultString.token_endpoint,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: $.param({
        grant_type: authPasswordFlowConfig.grant_type,
        scope: authPasswordFlowConfig.scope,
        username: userInfor.email,
        password: userInfor.password,
        client_id: authPasswordFlowConfig.clientId,
        client_secret: authPasswordFlowConfig.ClientSecret
      })
    };
    return new Promise((resolve, reject) => {
      this.req(options)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
  refreshToken() {
    setTimeout(() => {
      const authInfo = this.getAuthInfo();
      const options = {
        method: defaultString.METHOD_POST,
        url: defaultString.token_endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: $.param({
          grant_type: authPasswordFlowConfig.refreshToken,
          refresh_token: authInfo.refresh_token,
          scope: authPasswordFlowConfig.scope,
          client_id: authPasswordFlowConfig.clientId,
          client_secret: authPasswordFlowConfig.ClientSecret
        })
      };
      this.req(options)
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          this.refreshToken();
        })
        .catch(() => auth.logout());
    }, 1000 * 60 * 15);
  },
  getAuthInfo() {
    return JSON.parse(localStorage.getItem("auth_information"));
  },
  req(options) {
    return new Promise((resolve, reject) => {
      axios(options)
        .then(res => resolve(res))
        .catch(err => this._errorHandler(reject, err));
    });
  },
  getInforAuth() {
    return localStorage.getItem("authConfig");
  },
  _errorHandler(reject, err) {
    //window.app.$broadcast('EVENT_COMMON_ERROR', err);
    if (err.response && err.response.status === 401) {
      //window.location.reload();
    }
    if (err.response && err.response.status === 503) {
      // window.location.reload();
    }
    if (err.response && err.response.status === 400) {
      EventBus.$emit("errors", { type: "request_auth", error: err.message });
    }
    return reject(err);
  }
};
