<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addInsurancePayment">
          <span>Thêm mới</span>
        </a>
      </div>
      <data-table ref="datatable" :get-data="getInsurancePayment">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Tên nhân viên</th>
          <th class="sort sorting_asc" @click="props.sort('reason_leave', $event)">Lý do nghỉ</th>
          <th class="sort sorting_asc" @click="props.sort('num_social_security', $event)">Số sổ BHXH</th>
          <th class="sort sorting_asc" @click="props.sort('num_day_leave', $event)">Số ngày nghỉ</th>
          <th class="sort sorting_asc" @click="props.sort('insurance_money', $event)">Tiền bảo hiểm</th>
          <th class="sort sorting_asc" @click="props.sort('amount', $event)">Tổng tiền</th>
          <th>Ghi chú</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"/>
            <td v-text="props.item.reason_leave"/>
            <td v-text="props.item.num_social_security"/>
            <td v-text="props.item.num_day_leave"/>
            <td v-text="props.item.insurance_money"/>
            <td v-text="props.item.amount"/>
            <td v-text="props.item.notes"/>
            <td>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateInsurancePayment(props.item)">
                <i class="ti-marker-alt"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <ip-detail-modal v-if="isShow" :detail="ipDetail" :is-create="isCreate"/>
  </div>
</template>

<script>
import MasterView from '../../views/MasterView'
import DataTable from '../commons/DataTable'
import rf from '../../requests/RequestFactory'
import IpDetailModal from '../commons/InsuranceModal/IPDetailModal'

export default {
  name: 'IPDetailLayout',
  components: {
    DataTable,
    IpDetailModal
  },
  extends: MasterView,
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
      modal_id: 'detail-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getInsurancePayment() {
      const query = this.$route.query.id
      return rf.getRequest('IPDetailRequest').getAll({ id: query })
    },
    addInsurancePayment(e) {
      e.preventDefault()
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    updateInsurancePayment(ipDetail) {
      this.isCreate = false
      Object.assign(this.ipDetail, this.setData(this.ipDetail, ipDetail))
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.ipDetail = this.emptyData(this.ipDetail)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
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
