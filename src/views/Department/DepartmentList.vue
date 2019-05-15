<template>
  <div>
    <div class="col-12 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="epm-tb-header">
            <h4 class="header-title header-underline" v-text="$t('table.department.header')"/>
          </div>
          <div class="filter-container">
            <el-input :placeholder="$t('table.department.search_name')" v-model="listQuery.keySearchDepartment" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
            <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addPage">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            ref="datatable"
            :key="tableKey"
            :data="departments"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange">
            <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
              <template slot-scope="scope">
                <span class="id">{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.department.name')" prop="name" align="center" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.department.email')" prop="email" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.department.phone_number')" prop="phone_number" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone_number }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.department.count_emp')" prop="count_emp" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count_emp }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.department.count_roll')" prop="count_roll" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.count_roll }}</span>
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
  </div>
</template>

<script>
const FIELD_NAME = 'field-name'
const FIELD_ID = 'id'

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
      headerTitle: 'Bộ phận',
      header: 'Thêm mới bộ phận',
      tableKey: 0,
      departments: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        keySearchDepartment: undefined,
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
      rf.getRequest('DepartmentRequest')
        .getAll(this.listQuery)
        .then(response => {
          this.departments = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    handleUpdate(row) {
      return this.$router.push({
        name: 'DepartmentEdit',
        params: { id: row.id }
      })
    },
    addPage() {
      this.$router.push({
        name: 'DepartmentAdd'
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
