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
                  <el-form>
                    <div class="form-group">
                      <label>{{ $t('ip.title') }}</label>
                      <el-input :rows="1" v-model="insuranceP.name" :placeholder="$t('ip.title')" type="text" class="article-textarea"/>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('ip.time') }}</label>
                      <el-form-item prop="time">
                        <el-date-picker v-model="insuranceP.time" :placeholder="$t('ip.time')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4" @click="storeOrUpdate">
                      <i class="ti-save"/> {{ isCreate ? btnCreate : btnUpdate }}
                    </button>
                  </el-form>
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
import rf from '@/api/commons/RequestFactory'
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
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      createTitle: this.$t('ip.add_title'),
      updateTitle: this.$t('ip.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      insuranceP: {
        name: '',
        time: '',
        id: ''
      },
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
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.insuranceP = this.insurancePayment
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
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
          .update(this.insuranceP)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-ip', true)
            }
          })
      }
      rf.getRequest('InsurancePaymentRequest')
        .store(this.insuranceP)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-ip', true)
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
