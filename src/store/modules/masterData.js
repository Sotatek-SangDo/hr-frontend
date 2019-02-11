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
        
        getNationalities().then(response => {
          commit('SET_NATIONALITIES', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
        
      })
      
    },
    getAllEmployeeStatus({ commit, state }) {
      return new Promise((resolve, reject) => {
        getEmployeeStatus().then(response => {

          commit('SET_EMPLOYEE_STATUS', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      
    }
  }
}

export default masterData
