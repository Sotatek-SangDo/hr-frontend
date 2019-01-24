<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <tab-slide :tabs="tabs">
        <div id="nv" role="tabpanel" class="tab-pane fade active in show">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="epm-tb-header">
                  <h4 class="header-title header-underline">Danh sách nhân viên</h4>
                  <a class="button-add button" @click="addPage">
                    <span>Thêm mới</span>
                  </a>
                </div>
                <data-table ref="datatable" :get-data="getEmployees">
                  <template slot="head" slot-scope="props">
                    <th class="sort sorting_asc" @click="props.sort('name', $event)">Họ và tên</th>
                    <th>Công việc</th>
                    <th>Địa chỉ</th>
                    <th>Số ĐT</th>
                    <th>Ngày sinh</th>
                    <th>Email công việc</th>
                    <th>Thao tác</th>
                  </template>
                  <template slot="body" slot-scope="props">
                    <tr @click="profilePage(props.item.id)">
                      <td v-text="props.item.name"/>
                      <td v-text="props.item.job.title"/>
                      <td v-text="props.item.address"/>
                      <td v-text="props.item.phone"/>
                      <td v-text="props.item.birthday"/>
                      <td v-text="props.item.private_email"/>
                      <td>
                        <span>
                          <i class="ti-search"/>
                        </span>
                      </td>
                    </tr>
                  </template>
                </data-table>
              </div>
            </div>
          </div>
        </div>
        <div id="kn" role="tabpanel" class="tab-pane fade">
          <employee-skill/>
        </div>
        <div id="hv" role="tabpanel" class="tab-pane fade">
          <employee-education/>
        </div>
        <div id="chc" role="tabpanel" class="tab-pane fade">
          <employee-certification/>
        </div>
        <div id="ngn" role="tabpanel" class="tab-pane fade">
          <employee-language/>
        </div>
        <div id="dbkc" role="tabpanel" class="tab-pane fade">
          <employee-emergency-contact/>
        </div>
        <div id="pb" role="tabpanel" class="tab-pane fade">
          <employee-department/>
        </div>
      </tab-slide>
    </template>
  </home-layout>
</template>

<script>
import DataTable from '../../components/commons/DataTable'
import MasterView from '../MasterView'
import HomeLayout from '../../components/HomeLayout'
import EmployeeSkill from '../../components/employee/EmployeeSkill'
import EmployeeEducation from '../../components/employee/EmployeeEducation'
import EmployeeCertification from '../../components/employee/EmployeeCertification'
import EmployeeLanguage from '../../components/employee/EmployeeLanguage'
import EmployeeEmergencyContact from '../../components/employee/EmployeeEmergencyContact'
import EmployeeDepartment from '../../components/employee/EmployeeDepartment'
import TabSlide from '../../components/TabSlide'
import rf from '../../requests/RequestFactory'

export default {
  components: {
    HomeLayout,
    DataTable,
    TabSlide,
    EmployeeSkill,
    EmployeeEducation,
    EmployeeCertification,
    EmployeeLanguage,
    EmployeeEmergencyContact,
    EmployeeDepartment
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Nhân viên',
      header: 'Thêm mới nhân viên',
      tabs: [
        { title: 'Nhân viên', href: 'nv' },
        { title: 'Kỹ năng', href: 'kn' },
        { title: 'Học vấn', href: 'hv' },
        { title: 'Chứng chỉ', href: 'chc' },
        { title: 'Ngôn ngữ', href: 'ngn' },
        { title: 'Danh bạ khẩn cấp', href: 'dbkc' },
        { title: 'Phòng ban', href: 'pb' }
      ],
      breadcrumbs: [{ title: 'Nhân viên', href: '' }],
      empView: {},
      emp: {
        full_name: '',
        nationality_id: '',
        birthday: '',
        gender: '',
        marital_status: '',
        ethnicity: '',
        address: '',
        country: '',
        phone: '',
        private_email: '',
        email: '',
        joined_at: '',
        confirmed_at: '',
        department: '',
        supervisor: '',
        indirect_supervisor: '',
        status: '',
        job: '',
        pay_grade: ''
      }
    }
  },
  mounted() {
    this.inital()
  },
  methods: {
    profilePage(empId) {
      return this.$router.push({
        name: 'employee-profile',
        query: { id: empId }
      })
    },
    addPage() {
      this.$router.push({ name: 'employee-add' })
    },
    getEmployees() {
      return rf.getRequest('EmployeeRequest').getEmpFullInfo()
    },
    inital() {
      this.sleep(500).then(() => {
        this.init()
      })
      this.fadeOut()
    }
  }
}
</script>
<style scoped lang="sass">
@import url("https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css")
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
