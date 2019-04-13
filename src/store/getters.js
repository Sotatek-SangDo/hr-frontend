const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  nationalities: (state, getters) => state.masterData.nationalities,
  employeeStatus: state => state.masterData.employeeStatus,
  getNationalityById: (state) => (id) => {
    return state.masterData.nationalities.find(nationality => nationality.id === id)
  },
  departments: state => state.masterData.departments,
  jobs: state => state.masterData.jobs,
  paygrades: state => state.masterData.paygrades,
  skills: state => state.masterData.skills,
  qualifications: state => state.masterData.qualifications,
  certifications: state => state.masterData.certifications,
  languages: state => state.masterData.languages,
  contractType: state => state.contractType
}
export default getters
