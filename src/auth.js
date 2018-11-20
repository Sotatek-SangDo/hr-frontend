import rf from './requests/RequestFactory';

export default {
  login (params, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.getItem('token')) {
      if (cb) cb(true)
      return
    }
    pretendRequest(params, (res) => {
      if (res.authenticated) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        if (cb) cb({ authenticated: true })
      } else {
        if (cb) cb(res)
      }
    })
  },

  getToken () {
    return localStorage.getItem('token')
  },

  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  },

  loggedIn () {
    return !!localStorage.getItem('token')
  },
}

function pretendRequest (params, cb) {
  rf.getRequest('UserRequest').login(params).then((res) => {
    const responseData = {
      authenticated: true
    };
    if (!res.status && res.errors) {
      responseData.authenticated = false
      responseData.error = res.errors
      return cb(responseData)
    }
    responseData.token = res.remember_token
    responseData.user = res
    cb(responseData)
  }).catch(err => cb({ error: err }));
}
