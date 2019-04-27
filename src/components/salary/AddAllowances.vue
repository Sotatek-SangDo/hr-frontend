<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="allowance" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.employee') }}</label>
                <el-form-item prop="employee_id">
                  <el-drag-select v-model="allowance.employee_id" :placeholder="$t('placeholder.allowance_add.employee')">
                    <el-option v-for="(item, index) in employees" :label="item.name" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.allowance_type') }}</label>
                <el-form-item prop="allowance_code">
                  <el-input :rows="1" v-model="allowance.allowance_type" :placeholder="$t('placeholder.allowance_add.allowance_type')" :maxlength="8" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.subsidy') }}</label>
                <el-form-item prop="subsidy">
                  <el-input :rows="1" v-model="allowance.subsidy" :placeholder="$t('placeholder.allowance_add.subsidy')" :maxlength="8" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.apply_date') }}</label>
                <el-form-item prop="apply_date">
                  <el-date-picker v-model="allowance.apply_date" :placeholder="$t('placeholder.allowance_add.apply_date')" value-format="yyyy-MM-dd" type="date"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.notes') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="allowance.notes" :placeholder="$t('placeholder.allowance_add.notes')" :maxlength="8" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('allowance.status') }}</label>
                <el-form-item prop="status">
                  <el-drag-select v-model="allowance.status" :placeholder="$t('placeholder.allowance_add.status')">
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
              {{ allowanceId ? createBtn : updateBtn }}
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
  name: 'AllowancesAdd',
  components: {
    ElDragSelect
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    allowanceId: {
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
      allowance: {
        employee_id: '',
        allowance_type: '',
        apply_date: '',
        subsidy: '',
        notes: '',
        status: '',
        id: ''
      },
      formData: new FormData(),
      status: ['Hết hiệu lực', 'Đang có hiệu lưc'],
      employees: {},
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        employee_id: [{ validator: validateRequire }],
        allowance_type: [{ validator: validateRequire }],
        apply_date: [{ validator: validateRequire }],
        subsidy: [{ validator: validateRequire }],
        notes: [{ validator: validateRequire }],
        status: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.allowanceId) {
      this.getAllowances()
    }
    this.initial()
    if (!this.allowanceTypies) {
      this.$store.cache
        .dispatch('getMasterData')
        .then(res => {
          this.allowanceTypies = res.data.allowanceType
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
      return new Error(`${this.$t(`validation.allowance.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.allowance.employee_id = response.employee_id
      this.allowance.allowance_type = response.allowance_type
      this.allowance.apply_date = response.apply_date
      this.allowance.subsidy = response.subsidy
      this.allowance.status = response.status
      this.allowance.notes = response.notes
      this.allowance.id = response.id
    },
    getAllowances() {
      rf.getRequest('AllowancesRequest')
        .getAllowances({ id: this.allowanceId })
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
      _.forEach(this.allowance, (allowance, i) => {
        this.formData.append(`${i}`, allowance)
      })
      if (this.allowanceId) {
        return rf
          .getRequest('AllowancesRequest')
          .update(this.formData)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('AllowancesRequest')
        .store(this.formData)
        .then(res => {
          this.handleRespone(res)
        }).catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'Allowances' })
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
