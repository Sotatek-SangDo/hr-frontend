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
                  <el-form>
                    <div class="form-group">
                      <label>{{ $t('insurance.employee') }}</label>
                      <el-drag-select v-model="insurance.emp_id" :placeholder="$t('insurance.emp_select')">
                        <el-option v-for="(e, index) in emps" :label="e.name" :value="e.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('insurance.num_social_security') }}</label>
                      <el-input :rows="1" v-model="insurance.num_social_security" :placeholder="$t('insurance.num_social_security')" type="text" class="article-textarea"/>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('insurance.num_health_insurance') }}</label>
                      <el-input :rows="1" v-model="insurance.num_health_insurance" :placeholder="$t('insurance.num_health_insurance')" type="text" class="article-textarea"/>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('insurance.place_registration_medical') }}</label>
                      <el-input :rows="1" v-model="insurance.place_registration_medical" :placeholder="$t('insurance.place_registration_medical')" type="text" class="article-textarea"/>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('insurance.salary_paid') }}</label>
                      <el-input :rows="1" v-model="insurance.salary_paid" :placeholder="$t('insurance.salary_paid')" type="text" class="article-textarea"/>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('insurance.started_at') }}</label>
                      <el-form-item prop="started_at">
                        <el-date-picker v-model="insurance.started_at" :placeholder="$t('insurance.started_at')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('insurance.status.title') }}</label>
                      <el-drag-select v-model="insurance.status" :placeholder="$t('insurance.status_select')">
                        <el-option v-for="(s, index) in status" :label="s" :value="s" :key="index" />
                      </el-drag-select>
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
  name: 'InsuranceModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    propInsurance: {
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
      createTitle: this.$t('insurance.add_title'),
      updateTitle: this.$t('insurance.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
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
      isDisable: false,
      emps: {},
      errors: [],
      modal_id: 'insurance-modal',
      status: [
        this.$t('insurance.status.st1'),
        this.$t('insurance.status.st2'),
        this.$t('insurance.status.st3')

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
        .getList()
        .then(res => (this.emps = res.data))
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
          .update(this.insurance)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eInsurance', true)
            }
          })
      }
      rf.getRequest('InsuranceRequest')
        .store(this.insurance)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eInsurance', true)
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
