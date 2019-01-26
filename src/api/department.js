import request from '@/utils/request'

export function fetchList(query) {
  request({
    url: 'http://mock.erptech.vn/mock/5c493ec0c583af69a0715fdb/api/401',
    method: 'get'
  })
    
  return request({
    url: parseUrl(),
    method: 'get',
    params: query
  })
}

export function update(data) {
  return request({
    url: parseUrl('update'),
    method: 'post',
    data
  })
}

export function store(data) {
  return request({
    url: parseUrl('store'),
    method: 'post',
    data
  })
}

export function destroy(data) {
  return request({
    url: parseUrl('destroy'),
    method: 'post',
    data
  })
}

const getModel = () => {
  // return process.env.ENV_CONFIG === 'dev' ? 'mock-department' : 'departments'
  return 'departments'
}

const parseUrl = (url = '') => {
  return url ? `${getModel()}/${url}` : `${getModel()}`
}

