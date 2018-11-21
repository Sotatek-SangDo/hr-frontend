import axios from 'axios'

export default class BaseRequest {
    getPrefix () {
        return `${window.config.API_URL}`;
    }

    get (url, params = {}, cancelToken) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.getPrefix() + url, {
            params,
            cancelToken: cancelToken ? cancelToken.token : undefined,
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            this._errorHandler(reject, error);
          });
      });
    }
  
    put (url, data = {}) {
      return new Promise((resolve, reject) => {
        axios
          .put(this.getPrefix() + url, data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            this._errorHandler(reject, error);
          });
      });
    }
  
    post (url, data = {}) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.getPrefix() + url, data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            this._errorHandler(reject, error);
          });
      });
    }
  
    del (url, params = {}) {
      return new Promise((resolve, reject) => {
        axios
          .delete(this.getPrefix() + url, { params })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            this._errorHandler(reject, error);
          });
      });
    }
  
    _responseHandler (resolve, res) {
      return resolve(res.body.data);
    }
  
    _errorHandler (reject, err) {
      //window.app.$broadcast('EVENT_COMMON_ERROR', err);
      if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
        // window.location.reload();
      }
      if (err.response && err.response.status === 503) { // maintenance
        // window.location.reload();
      }
      return reject(err);
    }
  }
  
