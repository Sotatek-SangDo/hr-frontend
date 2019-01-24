<template>
  <div id="insurance-payment-modal" class="modal fade show">
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
                      <label for="detail-kni">Tên đợt thanh thoán</label>
                      <textarea id="detail-kni" v-model="insuranceP.title" type="text" class="form-control" placeholder="Tên đợt thanh toán" />
                    </div>
                    <date-picker v-if="delay" :title="startedAt" v-model="insuranceP.time" :default="getDate(insuranceP.time)"/>
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
import DatePicker from '../DatePicker'
import _ from 'lodash'

export default {
  name: 'InsurancePaymentModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    insurancePayment: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm mới đợt thanh toán bảo biểm',
      updateTitle: 'Chỉnh sửả đợt thanh toán bảo hiểm',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
      insuranceP: {
        title: '',
        time: '',
        id: ''
      },
      startedAt: 'Thời gian',
      isDisable: false,
      errors: [],
      modal_id: 'insurance-payment-modal',
      delay: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.insuranceP = this.insurancePayment
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      console.log(this.insuranceP)
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.insuranceP, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('InsurancePaymentRequest')
          .update({ data: this.insuranceP })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-ip', res.data)
            }
          })
      }
      rf.getRequest('InsurancePaymentRequest')
        .store({ data: this.insuranceP })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-ip', res.data)
          }
        })
    },
    clearData() {
      this.insuranceP = this.emptyData(this.insuranceP)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
