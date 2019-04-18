<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="contract" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.employee') }}</label>
                <el-form-item prop="employee_id">
                  <el-drag-select v-model="contract.employee_id" :placeholder="$t('placeholder.contract_add.employee')">
                    <el-option v-for="(item, index) in employees" :label="item.name" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.contract_code') }}</label>
                <el-form-item prop="contract_code">
                  <el-input :rows="1" v-model="contract.contract_code" :placeholder="$t('placeholder.contract_add.contract_code')" :maxlength="8" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.start_date') }}</label>
                <el-form-item prop="start_date">
                  <el-date-picker v-model="contract.start_date" :placeholder="$t('placeholder.contract_add.start_date')" value-format="yyyy-MM-dd" type="date"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.end_date') }}</label>
                <el-form-item prop="end_date">
                  <el-date-picker v-model="contract.end_date" :placeholder="$t('placeholder.contract_add.end_date')" type="date" value-format="yyyy-MM-dd"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.contract_type') }}</label>
                <el-form-item prop="contract_type_id">
                  <el-drag-select v-model="contract.contract_type_id" :placeholder="$t('placeholder.contract_add.contract_type')">
                    <el-option v-for="(item, index) in contractTypies" :label="item.type" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.salary_basic') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="contract.salary_basic" :placeholder="$t('placeholder.contract_add.salary_basic')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.salary_insurrance') }}</label>
                <el-form-item>
                  <el-drag-select v-model="contract.salary_insurance_id" :placeholder="$t('placeholder.contract_add.salary_insurrance')">
                    <el-option v-for="(item, index) in salaryInsurances" :label="item.insurance" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('contract.status') }}</label>
                <el-form-item prop="status">
                  <el-drag-select v-model="contract.status" :placeholder="$t('placeholder.contract_add.status')">
                    <el-option v-for="(item, index) in status" :label="item" :value="item" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit" @click="submitForm">
              {{ contractId ? createBtn : updateBtn }}
            </button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'ContractAdd',
  components: {
    ElDragSelect
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    contractId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '' || !value) {
        callback(this.handError(rule))
      } else {
        callback()
      }
    }
    return {
      contract: {
        employee_id: '',
        contract_code: '',
        start_date: '',
        end_date: '',
        contract_type_id: '',
        salary_basic: '',
        salary_insurance_id: '',
        status: '',
        id: ''
      },
      formData: new FormData(),
      contractTypies: this.$store.getters.contractType,
      salaryInsurances: this.$store.getters.salaryInsurance,
      status: ['Hết hiệu lực', 'Đang có hiệu lưc'],
      employees: {},
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        employee_id: [{ validator: validateRequire }],
        contract_code: [{ validator: validateRequire }],
        start_date: [{ validator: validateRequire }],
        end_date: [{ validator: validateRequire }],
        contract_type_id: [{ validator: validateRequire }],
        salary_basic: [{ validator: validateRequire }],
        salary_insurance_id: [{ validator: validateRequire }],
        status: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.contractId) {
      this.getContract()
    }
    this.initial()
    if (!this.contractTypies) {
      this.$store.cache
        .dispatch('getMasterData')
        .then(res => {
          this.contractTypies = res.data.contractType
        })
    }

    if (!this.salaryInsurances) {
      this.$store.cache
        .dispatch('getMasterData')
        .then(res => {
          this.salaryInsurances = res.data.salaryInsurance
        })
    }
  },
  mounted() {
  },
  methods: {
    handError(rule) {
      return new Error(`${this.$t(`validation.contract.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.contract.employee_id = response.employee_id
      this.contract.contract_code = response.contract_code
      this.contract.start_date = response.start_date
      this.contract.end_date = response.end_date
      this.contract.contract_type_id = response.contract_type_id
      this.contract.salary_basic = response.salary_basic
      this.contract.salary_insurance_id = response.salary_insurance_id
      this.contract.status = response.status
      this.contract.id = response.id
    },
    getContract() {
      rf.getRequest('ContractRequest')
        .getContract({ id: this.contractId })
        .then(res => {
          this.setData(res.data)
        })
    },
    initial() {
      this.getEmployees()
      this.isShow = true
    },
    getEmployees() {
      rf.getRequest('EmployeeRequest')
        .getList()
        .then(res => (this.employees = res.data))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    submitForm(e) {
      e.preventDefault()
      this.isDisable = true
      this.$refs.postForm.validate((valid) => {
        if (!valid) {
          this.isDisable = false
        }
      })
      if (!this.isDisable) return
      this.contract.contract_code = `HĐ${this.contract.contract_code}`
      _.forEach(this.contract, (contract, i) => {
        this.formData.append(`${i}`, contract)
      })
      if (this.contractId) {
        return rf
          .getRequest('ContractRequest')
          .update(this.formData)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('ContractRequest')
        .store(this.formData)
        .then(res => {
          this.handleRespone(res)
        }).catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'Contract' })
        : this.errors.push({ keys: 'Lỗi chưa xác định trên server' })
    }
  }
}
</script>
<style scoped lang="sass">
.el-date-editor
  &.el-input
    width: 100%
.one-line
  display: block
  width: 100%
.container
  h5
    text-align: center
    margin-bottom: 20px
  .input-group-addon
    padding: 8px 14px
    background-color: #eaedf0
    border-left: 1px solid #f3d9d9
    border-radius: 0 5px 5px 0
    font-size: 26px
.errors
  height: 40px;
  font-size: 20px;
  color: red;
button:disabled
  cursor: not-allowed;
</style>
