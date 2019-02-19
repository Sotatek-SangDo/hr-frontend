<template>
  <div class="card">
    <div class="card-body">
      <div class="insurance-header">
        <h4 class="header-title header-underline" v-text="$t('table.recruitment.header')"/>
      </div>
      <div class="filter-container">
        <el-input :placeholder="$t('table.employee.search_name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addRecruitment">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        ref="datatable"
        :key="tableKey"
        :data="recruitments"
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
        <el-table-column :label="$t('table.recruitment.name')" prop="name" align="center" sortable>
          <template slot-scope="scope">
            <span @click="detailPage(scope.row.id)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.recruitment.started_at')" prop="started_at" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.started_at }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.recruitment.ended_at')" prop="ended_at" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ended_at }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.recruitment.expired_at')" prop="expired_at" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.expired_at }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.recruitment.num')" prop="num" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.recruitment.status')" prop="status" align="center">
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
    <recruitment-modal v-if="isShow" :recruitment="recruitment" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '@/views/MasterView'
import rf from '@/api/commons/RequestFactory'
import RecruitmentModal from '@/components/commons/RecruitmentModal/RecruitmentModal'
import Pagination from '@/components/Pagination'

export default {
  name: 'RecruitmentLayout',
  components: {
    RecruitmentModal,
    Pagination
  },
  extends: MasterView,
  data() {
    return {
      recruitment: {
        name: '',
        started_at: '',
        ended_at: '',
        status: '',
        expired_at: '',
        num: '',
        recruitment_required: '',
        id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'recruitment-modal',
      recruitments: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      tableKey: 0
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
      rf.getRequest('RecruitmentRequest')
        .getList(this.listQuery)
        .then(response => {
          this.recruitments = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    detailPage(param) {
      return this.$router.push({
        name: 'RecruitmentDetail',
        params: { id: param }
      })
    },
    addRecruitment(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    handleUpdate(recruitment) {
      this.isCreate = false
      Object.assign(
        this.recruitment,
        this.setData(this.recruitment, recruitment)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.recruitment = this.emptyData(this.recruitment)
    },
    tableRefresh() {
      this.handleFilter()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-recruitment', () => this.tableRefresh())
      window.EventBus.$on('update-recruitment', () => this.tableRefresh())
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
  tbody
    tr
      cursor: pointer
</style>
