import request from '@/utils/request'

export function fetchList(query) {
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

