import axios from "axios";
const PREFIX = "api/v1";
import EventBus from "../event-bus";

export default class BaseRequest {
  getPrefix() {
    return `${window.config.API_URL}${PREFIX}`;
  }
  getAuthorization() {
    return `Bearer ${localStorage.getItem("access_token")}`;
  }
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.getPrefix() + url, {
          params,
          headers: {
            Authorization: this.getAuthorization()
          }
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this._errorHandler(reject, error);
        });
    });
  }
  post(url, data = {}) {
    const params = data;
    return new Promise((resolve, reject) => {
      axios
        .post(this.getPrefix() + url, params, {
          headers: {
            Authorization: this.getAuthorization()
          }
        })
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
}
