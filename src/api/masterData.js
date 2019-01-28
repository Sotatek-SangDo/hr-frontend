import request from '@/utils/request'

export function getNationalities() {
  return request({
    url: `nationalities`,
    method: 'get'
  })
}

export function getEmployeeStatus() {
  return request({
    url: `employee-status`,
    method: 'get'
  })
}