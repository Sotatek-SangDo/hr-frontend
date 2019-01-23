const data = [{
    component: 'syncEmployee',
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