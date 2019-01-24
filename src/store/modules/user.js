import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, setRefreshToken, setExpiresAt, getRefreshToken, getExpiresAt } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    refreshToken: getRefreshToken(),
    expiresAt: getExpiresAt()
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_REFRESH_TOKEN: (state, refresh_token) => {
      state.refreshToken = refresh_token
    },
    SET_EXPIRES_AT: (state, expires_at) => {
      state.expiresAt = expires_at
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const form = {
        username: userInfo.username.trim(),
        password: userInfo.password
      }
      return new Promise((resolve, reject) => {
        loginByUsername(form).then(response => {
          const token = response.access_token
          commit('SET_TOKEN', token)
          commit('SET_REFRESH_TOKEN', response.access_token)
          commit('SET_EXPIRES_AT', response.expires_in)
          setToken(token)
          setRefreshToken(response.access_token)
          setExpiresAt(response.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) {
            reject('Verification failed, please login again.')
          }
          const user = response.data
          if (user.roles && user.roles.length > 0) {
            commit('SET_ROLES', user.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', user.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.username)
          dispatch('GenerateRoutes', data)
          resolve()
        })
      })
    }
  }
}

export default user
