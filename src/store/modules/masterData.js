import { getMasterData } from '@/api/masterData'

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
    getMasterData({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMasterData().then(response => {
          commit('SET_NATIONALITIES', response.data.nationality)
          commit('SET_EMPLOYEE_STATUS', response.data.employeeStatus)
          commit('SET_DEPARTMENT', response.data.department)
          commit('SET_JOB', response.data.job)
          commit('SET_PAYGRADE', response.data.paygrade)
          commit('SET_SKILL', response.data.skill)
          commit('SET_QUALIFICATION', response.data.qualification)
          commit('SET_CERTIFICATION', response.data.certification)
          commit('SET_E_LANGUAGE', response.data.language)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default masterData
