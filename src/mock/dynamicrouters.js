const data = [{
    component: 'syncEmployee',
    meta: {roles: ['admin']},
    children: [
      {
        component: 'childSyncEmployee'
      },
      {
        component: 'childSyncEmployee2'
      }
    ]
  }]

export default {
	getPermissionByRoles: () => {
	    return data
 	}
}