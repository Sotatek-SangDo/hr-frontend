import {
  getNationalities,
  getEmployeeStatus,
  getDepartments,
  getJobs,
  getPayGrades,
  getSkills,
  getQualifications,
  getCertifications,
  getLanguages
} from '@/api/masterData'

const masterData = {
  state: {
    nationalities: [],
    employeeStatus: [],
    departments: [],
    jobs: [],
    paygrades: [],
    skills: [],
    qualifications: [],
    certifications: [],
    languages: []
  },
  mutations: {
    SET_NATIONALITIES: (state, nationalities) => {
      state.nationalities = nationalities
    },
    SET_EMPLOYEE_STATUS: (state, employeeStatus) => {
      state.employeeStatus = employeeStatus
    },
    SET_DEPARTMENT: (state, departments) => {
      state.departments = departments
    },
    SET_JOB: (state, jobs) => {
      state.jobs = jobs
    },
    SET_PAYGRADE: (state, paygrades) => {
      state.paygrades = paygrades
    },
    SET_SKILL: (state, skills) => {
      state.skills = skills
    },
    SET_QUALIFICATION: (state, qualifications) => {
      state.qualifications = qualifications
    },
    SET_CERTIFICATION: (state, cer) => {
      state.certifications = cer
    },
    SET_E_LANGUAGE: (state, langs) => {
      state.languages = langs
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
    },
    getDepartments({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDepartments().then(response => {
          commit('SET_DEPARTMENT', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getJobs({ commit, state }) {
      return new Promise((resolve, reject) => {
        getJobs().then(response => {
          commit('SET_JOB', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getPayGrades({ commit, state }) {
      return new Promise((resolve, reject) => {
        getPayGrades().then(response => {
          commit('SET_PAYGRADE', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSkills({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSkills().then(response => {
          commit('SET_SKILL', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getQualifications({ commit, state }) {
      return new Promise((resolve, reject) => {
        getQualifications().then(response => {
          commit('SET_QUALIFICATION', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCertifications({ commit, state }) {
      return new Promise((resolve, reject) => {
        getCertifications().then(response => {
          commit('SET_CERTIFICATION', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getLanguages({ commit, state }) {
      return new Promise((resolve, reject) => {
        getLanguages().then(response => {
          commit('SET_E_LANGUAGE', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default masterData
