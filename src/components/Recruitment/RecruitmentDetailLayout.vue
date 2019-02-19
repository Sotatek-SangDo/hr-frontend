<template>
  <div class="card">
    <div class="card-body">
      <div class="insurance-header">
        <h4 class="header-title header-underline" v-text="$t('recruitment.detail_header')"/>
      </div>
      <div class="filter-container">
        <el-input :placeholder="$t('table.employee.search_name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="addCandidate">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        ref="datatable"
        :key="tableKey"
        :data="candidates"
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
        <el-table-column :label="$t('table.candidate.name')" prop="name" align="center" sortable>
          <template slot-scope="scope">
            <span @click="detailPage(scope.row.id)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.candidate.email')" prop="email" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.candidate.gender')" prop="gender" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.candidate.phonenumber')" prop="phonenumber" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phonenumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.candidate.birthday')" prop="birthday" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.candidate.status')" prop="status" align="center">
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
    <candidate-modal v-if="isShow" :prop-candidate="candidate" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '@/views/MasterView'
import rf from '@/api/commons/RequestFactory'
import CandidateModal from '@/components/commons/RecruitmentModal/CandidateModal'
import Pagination from '@/components/Pagination'

export default {
  name: 'RecruitmentDetailLayout',
  components: {
    CandidateModal,
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
      candidate: {
        job_id: '',
        email: '',
        name: '',
        gender: '',
        birthday: '',
        phonenumber: '',
        description: '',
        id: '',
        recruitment_id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'candidate-modal',
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      tableKey: 0,
      candidates: [],
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
      rf.getRequest('CandidateRequest')
        .getList(this.listQuery)
        .then(response => {
          this.candidates = response.data.data
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
    },
    addCandidate(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    handleUpdate(candidate) {
      this.isCreate = false
      Object.assign(this.candidate, this.setData(this.candidate, candidate))
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.candidate = this.emptyData(this.candidate)
    },
    tableRefresh() {
      this.handleFilter()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-candidate', () => this.tableRefresh())
      window.EventBus.$on('update-candidate', () => this.tableRefresh())
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
