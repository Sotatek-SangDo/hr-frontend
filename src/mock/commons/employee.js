import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@name(true)',
    work_email: '@email',
    avatar: '@string(5, 7)' + '.png',
    private_email: '@email',
    nationality_id: '@natural(1, 4)',
    ethnicity: '@natural(1, 4)',
    country: '@natural(1, 4)',
    address: '@province() @city()',
    joined_at: '@date("yyyy-MM-dd")',
    phone: '@string("number", 9)',
    'gender|1': ['Nam', 'Nữ', 'Khác'],
    birthday: '@date("yyyy-MM-dd")',
    'marital_status|1': ['Độc thân', 'Đã kết hôn', 'Li dị', 'Khác'],
    confirmed_at: '@date("yyyy-MM-dd")',
    supervisor_id: '@natural(1, 4)',
    indirect_supervisor: '@natural(1, 4)',
    department_id: '@natural(1, 4)',
    transportation_id: '@natural(1, 4)',
    paygrade_id: '@natural(1, 4)',
    notes: '@sentence()',
    status: '@natural(1, 3)',
    job_id: '@natural(1, 4)',
    job: {
      title: '@string(5, 7)'
    }
  }))
}

export default {
  getAll: () => {
    return List
  },
  getList: config => {
    const { title, page = 1, limit = 20, sort } = param2Obj(config.url)
    let mockList = List.filter(item => {
      if (title && item.name.indexOf(title.replace(/\+/g, ' ').trim()) < 0) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      data: pageList
    }
  }
}
