<template>
  <div id="insurance-modal" class="modal fade show">
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
                      <label for="kni">Kĩ năng</label>
                      <select id="kni" v-model="insurance.emp_id" class="form-control">
                        <option value="">Lựa chọn nhân viên</option>
                        <option
                          v-for="(e, index) in emps"
                          :key="index"
                          :value="e.id"
                          v-text="e.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Số sổ BHXH</label>
                      <textarea id="detail-kni" v-model="insurance.num_social_security" type="text" class="form-control" placeholder="Số sổ BHXH" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Số thẻ BHYT</label>
                      <textarea id="detail-kni" v-model="insurance.num_health_insurance" type="text" class="form-control" placeholder="Số thẻ BHYT" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Nơi đăng kí KCB</label>
                      <textarea id="detail-kni" v-model="insurance.place_registration_medical" type="text" class="form-control" placeholder="Nơi đăng kí KCB" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Mức đóng</label>
                      <textarea id="detail-kni" v-model="insurance.salary_paid" type="text" class="form-control" placeholder="Mức đóng ..." />
                    </div>
                    <date-picker v-if="delay" :title="startedAt" v-model="insurance.started_at" :default="getDate(insurance.started_at)"/>
                    <div class="form-group">
                      <label for="kni">Trạng thái</label>
                      <select id="kni" v-model="insurance.status" class="form-control">
                        <option value="">Chọn trạng thái</option>
                        <option
                          v-for="(s, index) in status"
                          :key="index"
                          :value="s"
                          v-text="s"/>
                      </select>
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
import DatePicker from '../DatePicker'
import _ from 'lodash'

export default {
  name: 'InsuranceModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    propInsurance: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm mới bảo biểm',
      updateTitle: 'Chỉnh sửả bảo hiểm',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
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
      startedAt: 'Bắt đầu từ ngày',
      isDisable: false,
      emps: {},
      errors: [],
      modal_id: 'insurance-modal',
      status: [
        'Đang tham gia',
        'Giảm tạm thời',
        'Giảm hẳn'
      ],
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
    getEmployees() {
      rf.getRequest('EmployeeRequest')
        .getAll()
        .then(res => (this.emps = res))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.insurance = this.propInsurance
      this.getEmployees()
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.insurance, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('InsuranceRequest')
          .update({ data: this.insurance })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eInsurance', res.data)
            }
          })
      }
      rf.getRequest('InsuranceRequest')
        .store({ data: this.insurance })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eInsurance', res.data)
          }
        })
    },
    clearData() {
      this.insurance = this.emptyData(this.insurance)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
