<template>
  <tab-slide :tabs="tabs">
    <div id="nv" role="tabpanel" class="tab-pane fade active in show">
      <div class="col-12 mt-5">
        <div v-if="addStep">
          <span class="back" @click="goToAddPage('list')">Quay lại</span>
        </div>
        <div v-show="listStep" class="card">
          <div class="card-body">
            <div class="epm-tb-header">
              <h4 class="header-title">Danh sách phòng ban</h4>
              <a @click="goToAddPage('add')">
                <span><i class="ti-plus"/>Thêm mới</span>
              </a>
            </div>
            <el-table ref="datatable" :data="tableData">
              <el-table-column>Name</el-table-column>
              <el-table-column>Email</el-table-column>
              <el-table-column>Phone</el-table-column>
              <el-table-column>Action</el-table-column>
              <template slot="body" slot-scope="props">
                <tr>
                  <td v-text="props.row.name"/>
                  <td v-text="props.row.email"/>
                  <td v-text="props.row.phone_number"/>
                  <td>
                    <span>Xem chi tiết</span>
                  </td>
                </tr>
              </template>
            </el-table>
          </div>
        </div>
        <div v-if="addStep" class="add-form">
          <add-department/>
        </div>
      </div>
    </div>
  </tab-slide>
</template>

<script>
import DataTable from '../../components/commons/DataTable'
import AddDepartment from './AddDepartment'
import TabSlide from '../../components/TabSlide'
import rf from '../../requests/RequestFactory'

export default {
  components: {
    AddDepartment,
    DataTable,
    TabSlide
  },
  data() {
    return {
      headerTitle: 'Nhân viên',
      tabs: [
        { title: 'Nhân viên', href: 'nv' },
        { title: 'Kỹ nămg', href: 'kn' },
        { title: 'Học vấn', href: 'hv' },
        { title: 'Chứng chỉ', href: 'chc' },
        { title: 'Ngôn ngữ', href: 'ngn' },
        { title: 'Phòng ban', href: 'pb' },
        { title: 'Danh bạ khẩn cấp', href: 'dbkc' }
      ],
      breadcrumbs: [
        { title: 'Home', href: '/' },
        { title: 'Nhân viên', href: '' }
      ],
      addStep: false,
      listStep: true,
      empView: {},
      tableData: [
        {
          name: 'fruit-1',
          email: 'apple-10',
          phone_number: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          email: 'apple-20',
          phone_number: 'banana-20',
          orange: 'orange-20'
        }
      ],
    }
  },
  mounted() {
    this.inital()
  },
  methods: {
    goToAddPage(type) {
      this.showLoader()
      if (type === 'list') {
        this.addStep = false
        this.listStep = true
      }
      if (type === 'add') {
        this.addStep = true
        this.listStep = false
      }
    },
    getDepartments() {
      return rf.getRequest('DepartmentRequest').getAll()
    },
    inital() {
      // this.sleep(500).then(() => {
      // this.init()
      // })
      // this.fadeOut()
      // result = this.getDepartments();
    }
  }
}
</script>
<style scoped lang="sass">
@import url("https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css")
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
  a
    margin-left: auto
    font-size: 20px
    border: 1px solid #f1f1f1
    background: #8525ff
    color: white
    padding: 10px 15px
    border-radius: 7px
    font-family: Averta-Bold
    font-weight: 600
.back
  color: blue
  cursor: pointer
  font-family: Averta-Bold
  text-decoration: underline
  text-decoration-color: #4d91ff
</style>
