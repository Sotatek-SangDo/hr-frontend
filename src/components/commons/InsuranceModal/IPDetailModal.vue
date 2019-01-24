<template>
  <div id="detail-modal" class="modal fade show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isCreate ? createTitle : updateTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 mt-12">
              <div class="card">
                <div class="card-body">
                  <form @submit.prevent="storeOrUpdate">
                    <div class="form-group">
                      <label for="kni">Chọn nhân viên</label>
                      <select id="kni" v-model="ipDetail.emp_id" class="form-control">
                        <option value="">Lựa chọn nhân viên</option>
                        <option
                          v-for="(e, index) in emps"
                          :key="index"
                          :value="e.id"
                          v-text="e.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="knii">Chọn đợt thanh thoán</label>
                      <select id="knii" v-model="ipDetail.ip_id" class="form-control">
                        <option value="">Lựa chọn đợt thanh toán</option>
                        <option
                          v-for="(ip, index) in insurancePayments"
                          :key="index"
                          :value="ip.id"
                          v-text="ip.title"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Lý do</label>
                      <input id="detail-kni" v-model="ipDetail.reason_leave" type="text" class="form-control" placeholder="Lý do" >
                    </div>
                    <div class="form-group">
                      <label for="detail-kni1">Số sổ BHXH</label>
                      <input id="detail-kni1" v-model="ipDetail.num_social_security" type="text" class="form-control" placeholder="Số sổ bảo hiểm xã hội" >
                    </div>
                    <div class="form-group">
                      <label for="detail-kni2">Số ngày nghỉ</label>
                      <input id="detail-kni2" v-model="ipDetail.num_day_leave" type="text" class="form-control" placeholder="Số ngaỳ nghỉ" >
                    </div>
                    <div class="form-group">
                      <label for="detail-kni3">Bảo hiểm thanh toán</label>
                      <input id="detail-kni3" v-model="ipDetail.insurance_money" type="text" class="form-control" placeholder="Bảo hiểm thanh toán" >
                    </div>
                    <div class="form-group">
                      <label for="detail-kni4">Tổng số tiền</label>
                      <input id="detail-kni4" v-model="ipDetail.amount" type="text" class="form-control" placeholder="Tổng số tiền" >
                    </div>
                    <div class="form-group">
                      <label for="detail-kni5">Ghi chú</label>
                      <textarea id="detail-kni5" v-model="ipDetail.notes" type="text" class="form-control" placeholder="Ghi chú" />
                    </div>
                    <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4">
                      <i class="ti-save"/> {{ isCreate ? btnCreate : btnUpdate }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rf from '../../../requests/RequestFactory'
import MasterView from '../../../views/MasterView'
import _ from 'lodash'

export default {
  name: 'IPDetailModal',
  extends: MasterView,
  props: {
    detail: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm mới',
      updateTitle: 'Chỉnh sửả',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
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
      isDisable: false,
      insurancePayments: {},
      emps: {},
      errors: [],
      modal_id: 'detail-modal',
      delay: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getEmployees() {
      rf.getRequest('EmployeeRequest')
        .getAll()
        .then(res => (this.emps = res))
    },
    getInsurancePayments() {
      return rf
        .getRequest('InsurancePaymentRequest')
        .getAll()
        .then(res => (this.insurancePayments = res))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.ipDetail = this.detail
      this.getEmployees()
      this.getInsurancePayments()
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id', 'notes']
      _.forEach(this.ipDetail, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('IPDetailRequest')
          .update({ data: this.ipDetail })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-ipDetail', res.data)
            }
          })
      }
      rf.getRequest('IPDetailRequest')
        .store({ data: this.ipDetail })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-ipDetail', res.data)
          }
        })
    },
    clearData() {
      this.ipDetail = this.emptyData(this.ipDetail)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
