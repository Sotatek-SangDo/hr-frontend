import rf from "./requests/RequestFactory";
import ss from "./config";
import config from "../src/config/config.js";

export default {
  login(params, cb) {
    cb = arguments[arguments.length - 1];
    if (ss.storage(config.SS_KEY)) {
      if (cb) cb(true);
      return;
    }
    pretendRequest(params, res => {
      if (res.authenticated) {
        ss.storage(config.SS_KEY, btoa(res.token));
        ss.storage(config.USER_KEY, JSON.stringify(res.user));
        if (cb) cb({ authenticated: true });
      } else {
        if (cb) cb(res);
      }
    });
  },

  getToken() {
    return ss.storage(config.SS_KEY);
  },

  logout() {
    ss.xstorage(config.SS_KEY);
    ss.xstorage(config.USER_KEY);
    window.location.reload();
  },

  loggedIn() {
    return !!ss.storage(config.SS_KEY);
  }
};

function pretendRequest(params, cb) {
  rf.getRequest("UserRequest")
    .login(params)
    .then(res => {
      const responseData = {
        authenticated: true
      };
      if (!res.status && res.errors) {
        responseData.authenticated = false;
        responseData.error = res.errors;
        return cb(responseData);
      }
      responseData.token = res.remember_token;
      responseData.user = res;
      cb(responseData);
    })
    .catch(err => {
      cb({ error: err });
    });
}
