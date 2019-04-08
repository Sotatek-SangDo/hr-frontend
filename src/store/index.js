import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import masterData from './modules/masterData'
import vuexCache from 'vuex-cache'
import { getToken } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    masterData
  },
  getters,
  plugins: [vuexCache]
})

if (getToken() && store.cache.has('getMasterData')) {
  store.cache.dispatch('getMasterData')
}
export default store
