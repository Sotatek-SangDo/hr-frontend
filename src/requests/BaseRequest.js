import axios from "axios";
import ss from "../config";
import crypto from "crypto";
const PREFIX = "api/v1";

export default class BaseRequest {
  getPrefix() {
    return `${window.config.API_URL}${PREFIX}`;
  }
  parseParams(params, url, method = "GET") {
    const tmp_param = {
      api_token: atob(ss.storage(window.config.SS_KEY)),
      signature: this.sign(url, method)
    };
    return Object.assign(params, tmp_param);
  }
  sign(url, method) {
    const sign_url = `${method} ${PREFIX}${url}`;
    return crypto
      .createHmac("sha256", `${atob(ss.storage(window.config.SS_KEY))}`)
      .update(sign_url)
      .digest("hex");
  }
  get(url, params = {}, cancelToken) {
    params = this.parseParams(params, url);
    return new Promise((resolve, reject) => {
      axios
        .get(this.getPrefix() + url, {
          params,
          cancelToken: cancelToken ? cancelToken.token : undefined
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this._errorHandler(reject, error);
        });
    });
  }
  put(url, data = {}) {
    data = this.parseParams(data, url, "PUT");
    return new Promise((resolve, reject) => {
      axios
        .put(this.getPrefix() + url, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this._errorHandler(reject, error);
        });
    });
  }
  post(url, data = {}) {
    data = this.parseParams(data, url, "POST");
    return new Promise((resolve, reject) => {
      axios
        .post(this.getPrefix() + url, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this._errorHandler(reject, error);
        });
    });
  }
  del(url, params = {}) {
    params = this.parseParams(params, url, "DELETE");
    return new Promise((resolve, reject) => {
      axios
        .delete(this.getPrefix() + url, { params })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this._errorHandler(reject, error);
        });
    });
  }
  _responseHandler(resolve, res) {
    return resolve(res.body.data);
  }
  _errorHandler(reject, err) {
    //window.app.$broadcast('EVENT_COMMON_ERROR', err);
    if (err.response && err.response.status === 401) {
      // window.location.reload();
    }
    if (err.response && err.response.status === 503) {
      // window.location.reload();
    }
    return reject(err);
  }
}
