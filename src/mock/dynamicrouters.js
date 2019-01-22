import map from '@/router'

const data = [{
    path: '/employee',
    component: 'syncEmployee',
    redirect: '/Employee/EmployeeList',
    meta: {
      title: 'employee',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: 'childSyncEmployee',
        name: 'Employee',
        meta: { title: 'Employee', icon: 'Employee', noCache: true }
      }
      // beforeEnter: requireAuth
    ]
  }]

export default {
	getDynamicRouter: () => {
	    return data
 	}
}