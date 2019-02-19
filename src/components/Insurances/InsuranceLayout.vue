<template>
  <div class="card">
    <div class="card-body">
      <div class="insurance-header">
        <h4 class="header-title header-underline" v-text="$t('table.insurance.header')"/>
      </div>
      <div class="filter-container">
        <el-input :placeholder="$t('table.employee.search_name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addInsurance">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        ref="datatable"
        :key="tableKey"
        :data="insurances"
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
        <el-table-column :label="$t('table.employee.name')" prop="name" align="center" sortable>
          <template slot-scope="scope">
            <span @click="detailPage(scope.row.id)">{{ scope.row.employee.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.birthday')" prop="birthday" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employee.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.employee.gender')" prop="gender" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employee.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.num_social_security')" prop="num_social_security" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num_social_security }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.num_health_insurance')" prop="num_health_insurance" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num_health_insurance }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.place_registration_medical')" prop="place_registration_medical" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.place_registration_medical }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.salary_paid')" prop="salary_paid" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.salary_paid }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.started_at')" prop="started_at" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.started_at }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.status')" prop="status" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button type="primary" size="medium" @click="handleDestroy(scope.row)">{{ $t('table.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <insurance-modal v-if="isShow" :prop-insurance="insurance" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '@/views/MasterView'
import rf from '@/api/commons/RequestFactory'
import InsuranceModal from '@/components/commons/InsuranceModal/InsuranceModal'
import Pagination from '@/components/Pagination'

export default {
  name: 'InsuranceLayout',
  components: {
    InsuranceModal,
    Pagination
  },
  extends: MasterView,
  data() {
    return {
      insurance: {
        emp_id: '',
        num_social_security: '',
        num_health_insurance: '',
        place_registration_medical: '',
        salary_paid: '',
        started_at: '',
        status: '',
        id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'insurance-modal',
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      tableKey: 0,
      insurances: []
    }
  },
  mounted() {
    this.onListener()
  },
  created() {
    this.getList()
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
      rf.getRequest('InsuranceRequest')
        .getList(this.listQuery)
        .then(response => {
          this.insurances = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    addInsurance(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    handleUpdate(insurance) {
      this.isCreate = false
      Object.assign(
        this.insurance,
        this.setData(this.insurance, insurance)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    handleDestroy(insurance) {
      if (confirm(this.$t('table.insurance.confirm_del'))) {
        rf.getRequest('InsuranceRequest')
          .destroy({ id: insurance.id })
          .then(res => this.handleFilter())
      }
    },
    clearData() {
      this.insurance = this.emptyData(this.insurance)
    },
    tableRefresh() {
      this.handleFilter()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-eInsurance', () => this.tableRefresh())
      window.EventBus.$on('update-eInsurance', () => this.tableRefresh())
      window.EventBus.$on('delete-eInsurance', () => this.tableRefresh())
    }
  }
}
</script>

<style lang="sass" scoped>
.epm-tb-header
  margin-bottom: 15px
  a
    cursor: pointer
table
  thead
    th
      font-size: 13px
      line-height: 40px !important
      &.sort:after,
      &.sort:before
        top: 0 !important
      &:last-child:after,
      &:last-child:before
        content: unset !important
</style>
