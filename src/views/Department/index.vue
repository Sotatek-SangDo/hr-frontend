<template>
  <tab-slide>
    <div id="nv" role="tabpanel" class="tab-pane fade active in show">
      <div class="col-12 mt-5">
        <div class="card">
          <div class="card-body">
            <div class="epm-tb-header">
              <h4 class="header-title">Danh sách phòng ban</h4>
            </div>
            <div class="filter-container">
              <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
              <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
              <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addItem()">{{ $t('table.add') }}</el-button>
            </div>

            <el-table
              v-loading="listLoading"
              ref="datatable"
              :key="tableKey"
              :data="list"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              @sort-change="sortChange">
              <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.department.name')" prop="name" align="center" sortable>
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.email')" prop="email" align="center" sortable>
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.phone')" prop="phone_number" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone_number }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                  <el-button size="mini" type="danger" @click="handleDestroy(scope.row)">{{ $t('table.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
              <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" style="width: 400px; margin: 0 auto">
                <el-form-item :label="$t('table.department.name')" prop="name">
                  <el-input v-model="temp.name"/>
                </el-form-item>
                <el-form-item :label="$t('table.department.email')">
                  <el-input v-model="temp.email" :placeholder="$t('placeholder.email')" type="email"/>
                </el-form-item>
                <el-form-item :label="$t('table.phone')">
                  <el-input v-model="temp.phone_number" :placeholder="$t('placeholder.phone')" type="input" @keyup.enter.native="handleConfirm"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="handleConfirm">{{ $t('table.confirm') }}</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </tab-slide>
</template>

<script>
import TabSlide from '../../components/TabSlide'
import rf from '../../requests/RequestFactory'
import Pagination from '@/components/Pagination'
import { fetchList, store, update, destroy } from '@/api/department'
import waves from '@/directive/waves'

export default {
  components: {
    TabSlide,
    Pagination
  },
  directives: { waves },
  data() {
    return {
      headerTitle: 'Nhân viên',
      listLoading: true,
      tableKey: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      activeName: 'nv',
      temp: {
        id: undefined,
        email: '',
        name: '',
        phone_number: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      list: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Chỉnh sửa',
        create: 'Thêm mới'
      }
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.clear()
      }
    }
  },
  mounted() {
    this.inital()
  },
  created() {
    this.getList()
  },
  methods: {
    createData() {
      store(this.temp).then(response => {
        this.dialogFormVisible = false
        if (response.data.status) {
          this.getList()
        }
      })
    },
    updateData() {
      update(this.temp).then(response => {
        this.dialogFormVisible = false
        if (response.data.status) {
          this.getList()
        }
      })
    },
    handleConfirm() {
      this.dialogStatus === 'create'
        ? this.createData()
        : this.updateData()
    },
    addItem() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleDestroy(row) {
      destroy(row).then(response => {
        if (response.data.status) {
          this.getList()
          this.$message({
            message: 'Thanh cong',
            type: 'success'
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getDepartments() {
      return rf.getRequest('DepartmentRequest').getAll()
    },
    inital() {
    },
    clear() {
      this.temp.id = undefined
      this.temp.email = ''
      this.temp.phone_number = ''
      this.temp.name = ''
    }
  }
}
</script>
<style scoped lang="sass">
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
