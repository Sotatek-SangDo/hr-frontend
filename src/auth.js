import ss from "./config";
import config from "../src/config/config.js";
import OAuth from "./auth/OAuth";

export default {
  login(params, cb) {
    cb = arguments[arguments.length - 1];
    if (this.loggedIn()) {
      if (cb) cb(true);
      return;
    }
    pretendRequest(params, res => {
      if (res.authenticated) {
        ss.storage(config.AUTH_INFOR, JSON.stringify(res));
        ss.storage(config.ACCESS_TOKEN, res.data.access_token);
        if (cb) cb({ authenticated: true });
      } else {
        cb({ authenticated: false });
      }
    });
  },
  getToken() {
    return ss.storage(config.ACCESS_TOKEN);
  },
  logout() {
    ss.xstorage(config.ACCESS_TOKEN);
    ss.xstorage(config.AUTH_INFOR);
    ss.xstorage("user");
    window.location.reload();
  },
  loggedIn() {
    return !!ss.storage(config.ACCESS_TOKEN);
  }
};

function pretendRequest(params, cb) {
  OAuth.getToken(params)
    .then(res => {
      cb({ authenticated: true, data: res });
      localStorage.setItem("auth_information", JSON.stringify(res));
    })
    .catch(err => {
      cb({ error: err });
    });
}
