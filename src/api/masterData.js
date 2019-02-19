import request from '@/utils/request'

export function getNationalities() {
  return request({
    url: `nationalities`,
    method: 'get'
  })
}
export function getEmployeeStatus() {
  return request({
    url: 'employee-status/get-list',
    method: 'get'
  })
}
export function getDepartments() {
  return request({
    url: 'departments/get-list',
    method: 'get'
  })
}
export function getJobs() {
  return request({
    url: 'jobs',
    method: 'get'
  })
}
export function getPayGrades() {
  return request({
    url: 'pay-grade',
    method: 'get'
  })
}
export function getSkills() {
  return request({
    url: 'skills',
    method: 'get'
  })
}
export function getQualifications() {
  return request({
    url: 'qualifications',
    method: 'get'
  })
}
export function getCertifications() {
  return request({
    url: 'certifications',
    method: 'get'
  })
}
export function getLanguages() {
  return request({
    url: 'languages',
    method: 'get'
  })
}
