<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Kỹ Năng</h4>
      </div>
      <data-table ref="datatable" :get-data="getEDepartment">
        <template slot="head">
          <th>Phòng</th>
          <th>Tên nhân viên</th>
          <th>Công việc</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td
              v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
              :rowspan="props.item.count_emp"
              v-text="props.item.name"/>
            <td v-text="props.item.emp_name" />
            <td v-text="props.item.title"/>
          </tr>
        </template>
      </data-table>
    </div>
  </div>
</template>

<script>
import rf from '../../requests/RequestFactory'
import DataTable from '../commons/DataTable'
import MasterView from '@/views/MasterView'

export default {
  name: 'EmployeeSkill',
  components: {
    DataTable
  },
  extends: MasterView,
  data() {
    return {}
  },
  mounted() {},
  methods: {
    getEDepartment() {
      return rf.getRequest('DepartmentRequest').getEDepartment()
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
      this.isShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
.header-title
  font-size: 24px
table
  tr
    th
      text-align: left
    td
      text-align: left
      padding-left: 20px !important
.epm-tb-header
  margin: 20px auto
</style>
