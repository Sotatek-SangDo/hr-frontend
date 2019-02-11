import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: `Phong ban ${i}`,
    email: '@email',
    phone_number: '@string("number", 9)'
  }))
}

export default {
  getAll: () => {
    return List
  },
  getList: config => {
    const result = Mock.mock({
      total: '@integer(100, 300)',
      'data|20': [{
        id: '@integer(1, 100)',
        name: 'Phòng Ban ' + '@integer(1, 100)',
        email: '@email',
        phone_number: '@string("number", 9)'
      }]
    })
    return result
  },
  createDepartment: (config) => {
    const mockList = List
    const params = JSON.parse(config.body)
    const item = {
      id: mockList[mockList.length - 1].id + 1,
      name: params.name,
      email: params.email,
      phone_number: params.phone_number
    }
    List.push(item)
    return {
      status: true
    }
  },
  updateDepartment: (config) => {
    const params = JSON.parse(config.body)
    const index = List.findIndex(item => item.id === params.id)
    if (index < 0) return { status: false }
    const item = List.find(i => i.id === params.id)
    item.name = params.name
    item.email = params.email
    item.phone_number = params.phone_number
    List[index] = item
    return {
      status: true
    }
  },
  destroyDepartment: (config) => {
    const params = JSON.parse(config.body)
    const index = List.findIndex(item => item.id === params.id)
    if (index < 0) return { status: false }
    delete List[index]
    return {
      status: true
    }
  }
}
