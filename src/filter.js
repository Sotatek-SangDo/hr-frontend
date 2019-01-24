import Vue from 'vue'
import _ from 'lodash'

Vue.filter('uppercase', value => _.toUpper(value))
Vue.filter('lowercase', value => _.toLower(value))
Vue.filter('capitalize', value => _.capitalize(value))
Vue.filter('date', value => {
  const split = value.split('-')
  return `Ngày ${split[2]} Tháng ${split[1]} năm ${split[0]}`
})

Vue.filter('dateTime', v => {
  return v.substring(0, v.length - 3)
})
