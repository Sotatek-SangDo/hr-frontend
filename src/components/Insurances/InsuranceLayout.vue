<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addInsurance">
          <span>Thêm mới</span>
        </a>
      </div>
      <data-table ref="datatable" :get-data="getInsurances">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Họ và tên</th>
          <th>Giới tính</th>
          <th>Ngày sinh</th>
          <th>Số sổ BHXH</th>
          <th>Số  thẻ BHYT</th>
          <th>Nơi đăng ký khám</th>
          <th>Mức lương đóng</th>
          <th>Từ tháng</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"/>
            <td v-text="props.item.employee.gender"/>
            <td v-text="props.item.employee.birthday"/>
            <td v-text="props.item.num_social_security"/>
            <td v-text="props.item.num_health_insurance"/>
            <td v-text="props.item.place_registration_medical"/>
            <td v-text="props.item.salary_paid"/>
            <td v-text="props.item.started_at"/>
            <td v-text="props.item.status"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeInsurance(props.item)">
                <i class="ti-trash"/>
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateInsurance(props.item)">
                <i class="ti-marker-alt"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <insurance-modal v-if="isShow" :prop-insurance="insurance" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '../../views/MasterView'
import DataTable from '../commons/DataTable'
import rf from '../../requests/RequestFactory'
import InsuranceModal from '../commons/InsuranceModal/InsuranceModal'

export default {
  name: 'InsuranceLayout',
  components: {
    DataTable,
    InsuranceModal
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
      modal_id: 'insurance-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getInsurances() {
      return rf.getRequest('InsuranceRequest').getAll()
    },
    addInsurance(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    removeInsurance(insurance) {
      if (confirm('Bạn có chắc muốn xóa bảo hiểm này?')) {
        rf.getRequest('InsuranceRequest')
          .destroy({ id: insurance.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eInsurance', insurance)
            }
          })
      }
    },
    updateInsurance(insurance) {
      this.isCreate = false
      Object.assign(
        this.insurance,
        this.setData(this.insurance, insurance)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.insurance = this.emptyData(this.insurance)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
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
