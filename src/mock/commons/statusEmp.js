import Mock from 'mockjs'

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    status: `@name(true)`
  }))
}

export default {
  getList: () => {
    return List
  }
}
