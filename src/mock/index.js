import Mock from 'mockjs'
import loginAPI from './login'
// import articleAPI from './article'
// import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// import dynamicRouters from './dynamicrouters'
// import departmentAPI from './commons/department'
// import employeeAPI from './commons/employee'
// import jobAPI from './commons/jobs'
// import empStatusAPI from './commons/statusEmp'
// import paygradeAPI from './commons/payGrades'
// import nationalityAPI from './commons/nationality'

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// nationality
// Mock.mock(/\/nationalities/, 'get', nationalityAPI.getList)
// Mock.mock(/\/departments/, 'get', departmentAPI.getList)
// Mock.mock(/\/mock-department\/store/, 'post', departmentAPI.createDepartment)
// Mock.mock(/\/mock-department\/update/, 'post', departmentAPI.updateDepartment)
// Mock.mock(/\/mock-department\/destroy/, 'post', departmentAPI.destroyDepartment)

// //paygrade
// Mock.mock(/\/pay-grade/, 'get', paygradeAPI.getList)

// //emp status
// Mock.mock(/\/employee-status/, 'get', empStatusAPI.getList)

// //jobs
// Mock.mock(/\/jobs/, 'get', jobAPI.getList)

// //employee
// Mock.mock(/\/employees/, 'get', employeeAPI.getAll)
// Mock.mock(/\/employees\/full-info/, 'get', employeeAPI.getList)

// //department
// Mock.mock(/\/departments/, 'get', departmentAPI.getAll)
// Mock.mock(/\/departments\/get-list/, 'get', departmentAPI.getList)
// Mock.mock(/\/departments\/store/, 'post', departmentAPI.createDepartment)
// Mock.mock(/\/departments\/update/, 'post', departmentAPI.updateDepartment)
// Mock.mock(/\/departments\/destroy/, 'post', departmentAPI.destroyDepartment)

// // 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// // 文章相关
// Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
// Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
// Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// // 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// // 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// Mock.mock(/\/routers\/dynamic/, 'post', dynamicRouters.getPermissionByRoles)

export default Mock
