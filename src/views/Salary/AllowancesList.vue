<template>
  <div>
    <div class="col-12 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="epm-tb-header">
            <h4 class="header-title header-underline" v-text="$t('table.allowance.header')"/>
          </div>
          <div class="filter-container">
            <el-input :placeholder="$t('table.allowance.search_name')" v-model="listQuery.keySearchAllowance" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
            <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addPage">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            ref="datatable"
            :key="tableKey"
            :data="allowances"
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
            <el-table-column :label="$t('table.allowance.employee')" prop="name" align="center" sortable>
              <template slot-scope="scope">
                <span class="field-name" @click="profilePage(scope.row.employee.id)">{{ scope.row.employee.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.allowance.allowance_type')" prop="allowance_type" align="center" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.allowance_type }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.allowance.subsidy')" prop="subsidy" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.subsidy }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.allowance.notes')" prop="notes" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.notes }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.allowance.apply_date')" prop="apply_date" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.apply_date }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.allowance.status')" prop="status" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
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
        <el-tab-pane :label="$t('table.allowance.info')" name="info">
          <div class="infor-container">
            <div class="col1 col-3 mt-3">
              <img :src="imageUrl()" @error="errorImage">
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('table.allowance.employee')"/>
              <span class="emp-info">{{ information ? information.employee.name : '' }}</span>
              <span v-text="$t('table.allowance.status')"/>
              <span class="emp-info">{{ information? information.status : '' }}</span>
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('table.allowance.allowance_type')"/>
              <span class="emp-info">{{ information ? information.allowance_type : '' }}</span>
              <span v-text="$t('table.allowance.subsidy')"/>
              <span class="emp-info">{{ information ? information.subsidy : '' }}</span>
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('table.allowance.notes')"/>
              <span class="emp-info">{{ information ? information.notes : '' }}</span>
              <span v-text="$t('table.allowance.apply_date')"/>
              <span class="emp-info">{{ information ? information.apply_date : '' }}</span>
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
      headerTitle: 'Trợ cấp',
      header: 'Thêm mới trợ cấp',
      tableKey: 0,
      information: {
        employee: {}
      },
      allowances: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        keySearchAllowance: undefined,
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
    imageUrl() {
      return this.information ? this.information.employee.avatar : NO_IMAGE
    },
    showInfor(allowance) {
      this.information = allowance
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
      rf.getRequest('AllowancesRequest')
        .getAll(this.listQuery)
        .then(response => {
          this.allowances = response.data.data
          this.total = response.data.total
          this.information = window._.find(this.allowances, (index, item) => { return index })
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    handleUpdate(row) {
      return this.$router.push({
        name: 'AllowancesEdit',
        params: { id: row.id }
      })
    },
    profilePage(empId) {
      return this.$router.push({
        name: 'EmployeeProfile',
        params: { id: empId }
      })
    },
    addPage() {
      this.$router.push({
        name: 'AllowanceAdd'
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
