import { asyncRouterMap, constantRouterMap, mapServerRouters, developerRouterMap } from '@/router'
import { getPermissionByRoles } from '@/api/dynamicrouters'


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

function mappingComponent(routes, roles) {
  const res = []

  routes.forEach(route => {

    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {

      const compName = tmp.component
      tmp.component = mapServerRouters[compName].component
      tmp.redirect = mapServerRouters[compName].redirect
      tmp.path = mapServerRouters[compName].path
      if(mapServerRouters[compName].meta){
        if (!tmp.meta){
          tmp.meta = {}
        }
        tmp.meta.title = mapServerRouters[compName].meta.title
        tmp.meta.icon = mapServerRouters[compName].meta.icon
        tmp.meta.noCache = mapServerRouters[compName].meta.noCache  
      }
      
      
      tmp.name = mapServerRouters[compName].name
      tmp.hidden = mapServerRouters[compName].hidden
      tmp.alwaysShow = mapServerRouters[compName].alwaysShow

      if (tmp.children) {
        tmp.children = mappingComponent(tmp.children, roles)
      }

      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        let serverRouters

        let result = []
        getPermissionByRoles().then(response => {
            result = response.data

            if (roles.includes('admin')) {
              accessedRouters = asyncRouterMap
            } else {
              accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            }

            if(result){
              serverRouters = mappingComponent(result, roles)
              accessedRouters = serverRouters.concat(accessedRouters)
            }


            if (process.env.NODE_ENV !== 'production'){
              accessedRouters = accessedRouters.concat(developerRouterMap)
            }

            commit('SET_ROUTERS', accessedRouters)
            resolve()
          })
        });
      
    }
  }
}

export default permission
