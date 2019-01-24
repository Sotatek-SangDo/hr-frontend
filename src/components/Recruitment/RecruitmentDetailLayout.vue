<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addCandidate">
          <span>Thêm mới</span>
        </a>
      </div>
      <data-table ref="datatable" :get-data="getCandidates">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Họ và tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Số điện thoại</th>
          <th>Ngày sinh</th>
          <th>Trang thai</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"/>
            <td v-text="props.item.email"/>
            <td v-text="props.item.gender"/>
            <td v-text="props.item.phonenumber"/>
            <td v-text="props.item.birthday"/>
            <td v-text="props.item.status"/>
            <td>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateCandidate(props.item)">
                <i class="ti-marker-alt"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <candidate-modal v-if="isShow" :prop-candidate="candidate" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '../../views/MasterView'
import DataTable from '../commons/DataTable'
import rf from '../../requests/RequestFactory'
import CandidateModal from '../commons/RecruitmentModal/CandidateModal'

export default {
  name: 'RecruitmentDetailLayout',
  components: {
    DataTable,
    CandidateModal
  },
  extends: MasterView,
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
        id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'candidate-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getCandidates() {
      const query = this.$route.query.id
      return rf
        .getRequest('CandidateRequest')
        .getCandidateByRecruitment({ recruitment_id: query })
    },
    addCandidate(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    updateCandidate(candidate) {
      this.isCreate = false
      Object.assign(this.candidate, this.setData(this.candidate, candidate))
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.candidate = this.emptyData(this.candidate)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
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
