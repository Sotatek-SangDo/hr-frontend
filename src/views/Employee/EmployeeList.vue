<template>
  <div>
    <div class="col-12 mt-5">
      <div class="card">
        <div class="card-body">
          <div class="epm-tb-header">
            <h4 class="header-title header-underline" v-text="$t('table.employee.header')"/>
          </div>
          <div class="filter-container">
            <el-input :placeholder="$t('table.employee.search_name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
            <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addPage">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            ref="datatable"
            :key="tableKey"
            :data="employees"
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
            <el-table-column :label="$t('table.employee.name')" prop="name" align="center" sortable>
              <template slot-scope="scope">
                <span class="field-name" @click="profilePage(scope.row.id)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.employee.job')" prop="job" align="center" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.job.title }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.address')" prop="address" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.phone')" prop="phone" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.birthday')" prop="birthday" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.birthday }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.employee.private_email')" prop="private_email" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.private_email }}</span>
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
        <el-tab-pane :label="$t('employee.info')" name="info">
          <div class="infor-container">
            <div class="col1 col-3 mt-3">
              <img :src="imageUrl()" @error="errorImage">
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('employee.id')"/>
              <span class="emp-info">{{ information.id || '' }}</span>
              <span v-text="$t('employee.name')"/>
              <span class="emp-info">{{ information.name || '' }}</span>
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('employee.address')"/>
              <span class="emp-info">{{ information.address || '' }}</span>
              <span v-text="$t('employee.ethnicity')"/>
              <span class="emp-info">{{ information.ethnicity || '' }}</span>
            </div>
            <div class="col1 col-3 mt-3">
              <span v-text="$t('employee.gender')"/>
              <span class="emp-info">{{ information.gender || '' }}</span>
              <span v-text="$t('employee.ethnicity')"/>
              <span class="emp-info">{{ information.ethnicity || '' }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('employee.skill')" name="skill">
          <employee-reference-skill :skills="information.skills"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('employee.education')" name="edu">
          <employee-reference-edu :edus="information.educations"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('employee.certification')" name="certification">
          <employee-reference-certi :cers="information.certifications"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('lang.title')" name="lang">
          <employee-reference-lang :lang="information.languages"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('emergency_contact.title')" name="ec">
          <employee-reference-ec :contact="information.emergency_contracts"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
const FIELD_NAME = 'field-name'
const FIELD_ID = 'id'
const NO_IMAGE = 'images/no-image.png'

import EmployeeSkill from '../../components/employee/EmployeeSkill'
import EmployeeEducation from '../../components/employee/EmployeeEducation'
import EmployeeCertification from '../../components/employee/EmployeeCertification'
import EmployeeLanguage from '../../components/employee/EmployeeLanguage'
import EmployeeEmergencyContact from '../../components/employee/EmployeeEmergencyContact'
import EmployeeDepartment from '../../components/employee/EmployeeDepartment'
import rf from '@/api/commons/RequestFactory'
import Pagination from '@/components/Pagination'
import EmployeeReferenceSkill from '@/components/employee/EmployeeReferenceSkill'
import EmployeeReferenceEdu from '@/components/employee/EmployeeReferenceEdu'
import EmployeeReferenceCerti from '@/components/employee/EmployeeReferenceCerti'
import EmployeeReferenceLang from '@/components/employee/EmployeeReferenceLang'
import EmployeeReferenceEc from '@/components/employee/EmployeeReferenceEc'
import $ from 'jquery'

export default {
  components: {
    EmployeeSkill,
    EmployeeEducation,
    EmployeeCertification,
    EmployeeLanguage,
    EmployeeEmergencyContact,
    EmployeeDepartment,
    Pagination,
    EmployeeReferenceSkill,
    EmployeeReferenceEdu,
    EmployeeReferenceCerti,
    EmployeeReferenceLang,
    EmployeeReferenceEc
  },
  data() {
    return {
      activeName: 'info',
      headerTitle: 'Nhân viên',
      header: 'Thêm mới nhân viên',
      tableKey: 0,
      information: {},
      employees: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
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
      return this.information.avatar || NO_IMAGE
    },
    showInfor(emp) {
      this.information = emp
      console.log(this.information)
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
      rf.getRequest('EmployeeRequest')
        .getFullInfo(this.listQuery)
        .then(response => {
          this.employees = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    profilePage(empId) {
      return this.$router.push({
        name: 'EmployeeProfile',
        params: { id: empId }
      })
    },
    handleUpdate(row) {
      return this.$router.push({
        name: 'EmployeeEdit',
        params: { id: row.id }
      })
    },
    addPage() {
      this.$router.push({
        name: 'EmployeeAdd'
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
