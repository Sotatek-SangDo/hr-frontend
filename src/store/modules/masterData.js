import { getNationalities, getEmployeeStatus } from '@/api/masterData'

const masterData = {
  state: {
    nationalities: [],
    employeeStatus: []
  },
  mutations: {
    SET_NATIONALITIES: (state, nationalities) => {
      state.nationalities = nationalities
    },
    SET_EMPLOYEE_STATUS: (state, employeeStatus) => {
      state.employeeStatus = employeeStatus
    }
  },
  actions: {
    getAllNationalities({ commit, state }) {
      return new Promise((resolve, reject) => {
        if(state.nationalities && state.nationalities.length > 0) {
          resolve()
        } else {
          getNationalities().then(response => {
            commit('SET_NATIONALITIES', response.data)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
      
    },
    getAllEmployeeStatus({ commit, state }) {
      return new Promise((resolve, reject) => {
        if(state.employeeStatus && state.employeeStatus.length > 0) {
          resolve()
        } else {
          getEmployeeStatus().then(response => {

            commit('SET_EMPLOYEE_STATUS', response.data)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
      
    }
  }
}

export default masterData
