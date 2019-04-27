<template>
  <div>
    <div class="col-12 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="epm-tb-header">
            <h4 class="header-title header-underline" v-text="$t('table.salary.header')"/>
          </div>
          <div class="filter-container">
            <el-input :placeholder="$t('table.salary.search_name')" v-model="listQuery.keySearchSalary" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            ref="datatable"
            :key="tableKey"
            :data="salaries"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange">
            <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
              <template slot-scope="scope">
                <span class="id" @click="showInfor(scope.row)">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.salary.employee_name')" prop="name" align="center" sortable>
              <template slot-scope="scope">
                <span class="field-name" @click="profilePage(scope.row.employee[0].id)">{{ scope.row.employee[0].name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.salary.salary_basic')" prop="salary_basic" align="center" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.salary_basic }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.salary.salary_insurance')" prop="salary_insurance" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.insurance ? scope.row.insurance.salary : '' }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.salary.salary_notes')" prop="notes" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.notes }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="medium" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
      </div>
    </div>
    <div class="col-12 mt-5">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('table.salary.info')" name="info">
          <div class="infor-container">
            <div class="col1 col-4 mt-4">
              <img :src="imageUrl(information)" @error="errorImage">
            </div>
            <div class="col1 col-4 mt-4">
              <span v-text="$t('table.salary.employee_name')"/>
              <span class="emp-info">{{ information.employee[0] ? information.employee[0].name : '' }}</span>
              <span v-text="$t('table.salary.salary_basic')"/>
              <span class="emp-info">{{ information ? information.salary_basic : '' }}</span>
            </div>
            <div class="col1 col-4 mt-4">
              <span v-text="$t('table.salary.salary_insurance')"/>
              <span class="emp-info">{{ information.insurance ?information.insurance.salary : '' }}</span>
              <span v-text="$t('table.salary.salary_notes')"/>
              <span class="emp-info">{{ information ? information.notes : '' }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
const FIELD_NAME = 'field-name'
const FIELD_ID = 'id'
const NO_IMAGE = 'images/no-image.png'

import rf from '@/api/commons/RequestFactory'
import Pagination from '@/components/Pagination'
import $ from 'jquery'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      activeName: 'info',
      headerTitle: 'Lương',
      tableKey: 0,
      information: {
        employee: {},
        salary_insurance: {}
      },
      salaries: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        keySearchSalary: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.inital()
  },
  methods: {
    errorImage($event) {
      $($event.target).attr('src', NO_IMAGE)
    },
    imageUrl(information) {
      return information.employee[0] ? information.employee[0].avatar : NO_IMAGE
    },
    showInfor(salary) {
      this.information = salary
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      rf.getRequest('SalaryRequest')
        .getAll(this.listQuery)
        .then(response => {
          this.salaries = response.data.data
          this.total = response.data.total
          this.information = window._.find(this.salaries, (index, item) => { return index })
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    handleUpdate(row) {
      return this.$router.push({
        name: 'SalaryEdit',
        params: { id: row.id }
      })
    },
    profilePage(empId) {
      return this.$router.push({
        name: 'EmployeeProfile',
        params: { id: empId }
      })
    },
    inital() {
      $(document).on('click', '.el-table__row span', function() {
        if ($(this).hasClass(FIELD_NAME)) return
        if ($(this).hasClass(FIELD_ID)) return
        $(this).parents('tr').find('.id').click()
      })
    }
  }
}
</script>
<style lang="sass">
@import url("https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css")
#pane-skill
  .skill-table
    width: 30% !important
.infor-container
  display: flex
  flex: 1 1 auto
  flex-wrap: wrap
  color: #444;
  font-weight: 400;
  div
    span
      display: flex
      width: 100%
      text-align: start
      color: #444
      font-weight: bold
      &.emp-info
        min-height: 30px;
        font-weight: 400
    img
      width: 100%
      height: auto
.button
  cursor: pointer
select
  display: none
.content
  min-height: 86vh
.header-button
  padding: 20px 0 10px 20px
  border-bottom: 1px solid #f4f4f4
.header-button
  a
    i
      font-size: 35px
table
  tr
    cursor: pointer
  margin: 0 auto;
  td
    span
      cursor: pointer
.header-button
  a
    color: blue
    cursor: pointer
    font-family: Averta-ExtraBold
    font-size: 20px
.header-button
  a
    i
      transition: all 0.5s ease-in-out
.header-button
  a:hover i
    transform: scale(1.4)
.content-tab
  margin-top: 50px
.content-tab
  .mdl-data-table
    tr:hover
      background-color: rgba(71, 182, 243, 0.4)
.content-tab
  .mdl-data-table
    font-family: Averta
.content-tab
  .mdl-data-table
    th
      font-family: Averta-Bold
      font-size: 15px
      text-align: center
.content-tab
  .mdl-data-table
    tr
      td
        font-size: 13px
        text-align: center
.mdl-tooltip
  background-color: #4fc6ff
  color: white
  border-radius: 5px
  font-size: 15px
  font-family: Averta-Bold
.nav-tabs
  padding: 0 2%
table.dataTable
  thead
    th
      &:after
        font-size: 30px
        top: 0
      &:before
        top: 0
        font-size: 30px
    .sorting_asc
      background-image: none
    .sorting_desc
      background-image: none
    .sorting
      background-image: none
.epm-tb-header
  display: flex
  justify-content: flex-start
  margin-bottom: 20px
  align-item: center
  margin: 25px auto
  a
    margin-left: auto
.back
  color: blue
  cursor: pointer
  font-family: Averta-Bold
  text-decoration: underline
  text-decoration-color: #4d91ff
.header-title
  text-transform: inherit;
  font-size: 22px
</style>
