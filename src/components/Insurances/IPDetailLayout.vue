<template>
  <div class="card">
    <div class="card-body">
      <div class="insurance-header">
        <h4 class="header-title header-underline" v-text="$t('ip.detail_header')"/>
      </div>
      <div class="filter-container">
        <el-input :placeholder="$t('table.employee.search_name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addInsurancePayment">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        ref="datatable"
        :key="tableKey"
        :data="ipDetails"
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
            <span @click="detailPage(scope.row.id)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.ip.reason_leave')" prop="reason_leave" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.reason_leave }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.insurance.num_social_security')" prop="num_social_security" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num_social_security }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.ip.num_day_leave')" prop="num_day_leave" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num_day_leave }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.ip.insurance_money')" prop="insurance_money" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.insurance_money }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.ip.amount')" prop="amount" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.ip.note')" prop="notes" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.notes }}</span>
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
    <ip-detail-modal v-if="isShow" :detail="ipDetail" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '@/views/MasterView'
import rf from '@/api/commons/RequestFactory'
import IpDetailModal from '@/components/commons/InsuranceModal/IPDetailModal'
import Pagination from '@/components/Pagination'

export default {
  name: 'IPDetailLayout',
  components: {
    IpDetailModal,
    Pagination
  },
  extends: MasterView,
  props: {
    detailId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      ipDetail: {
        ip_id: '',
        emp_id: '',
        reason_leave: '',
        num_social_security: '',
        num_day_leave: '',
        insurance_money: '',
        amount: '',
        notes: '',
        id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'detail-modal',
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      tableKey: 0,
      ipDetails: [],
      id: ''
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.onListener()
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
      this.listQuery.id = this.detailId
      rf.getRequest('IPDetailRequest')
        .getList(this.listQuery)
        .then(response => {
          this.ipDetails = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    addInsurancePayment(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    handleUpdate(ipDetail) {
      this.isCreate = false
      Object.assign(this.ipDetail, this.setData(this.ipDetail, ipDetail))
      this.isShow = true
      this.addEventShowModal()
    },
    handleDestroy(row) {
      if (confirm(this.$t('table.ip.confirm_del'))) {
        rf.getRequest('IPDetailRequest')
          .destroy({ id: row.id })
          .then(res => this.handleFilter())
      }
    },
    clearData() {
      this.ipDetail = this.emptyData(this.ipDetail)
    },
    tableRefresh() {
      this.handleFilter()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-ipDetail', () => this.tableRefresh())
      window.EventBus.$on('update-ipDetail', () => this.tableRefresh())
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
      line-height: 40px !important
      &.sort:after,
      &.sort:before
        top: 0 !important
      &:last-child:after,
      &:last-child:before
        content: unset !important
</style>
