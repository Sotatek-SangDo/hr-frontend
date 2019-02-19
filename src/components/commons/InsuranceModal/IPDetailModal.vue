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
                  <el-form>
                    <div class="form-group">
                      <label for="kni">{{ $t('ip_model.name') }}</label>
                      <el-drag-select v-model="ipDetail.emp_id" :placeholder="$t('ip_model.name')">
                        <el-option v-for="(e, index) in emps" :label="e.name" :value="e.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="kni">{{ $t('ip_model.payment') }}</label>
                      <el-drag-select v-model="ipDetail.ip_id" :placeholder="$t('ip_model.payment')">
                        <el-option v-for="(ip, index) in insurancePayments" :label="ip.name" :value="ip.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.reason_leave') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.reason_leave" :placeholder="$t('ip_model.reason_leave')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.num_social_security') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.num_social_security" :placeholder="$t('ip_model.num_social_security')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.num_day_leave') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.num_day_leave" :placeholder="$t('ip_model.num_day_leave')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.insurance_money') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.insurance_money" :placeholder="$t('ip_model.insurance_money')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.amount') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.amount" :placeholder="$t('ip_model.amount')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('ip_model.notes') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="ipDetail.notes" :placeholder="$t('ip_model.notes')" type="text" class="article-textarea"/>
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
import MasterView from '@/views/MasterView'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'IPDetailModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    detail: {
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
      createTitle: this.$t('ip_model.add_title'),
      updateTitle: this.$t('ip_model.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
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
        .getList()
        .then(res => (this.emps = res.data))
    },
    getInsurancePayments() {
      rf
        .getRequest('InsurancePaymentRequest')
        .getAll()
        .then(res => {
          console.log(res)
          this.insurancePayments = res.data
        })
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
          .update(this.ipDetail)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-ipDetail', res.data.data)
            }
          })
      }
      rf.getRequest('IPDetailRequest')
        .store(this.ipDetail)
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
