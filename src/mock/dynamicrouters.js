const data = [{
  component: 'syncEmployee',
  children: [
    {
      component: 'childSyncEmployee'
    },
    {
      component: 'childSyncEmployeeAdd'
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
