<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="business" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary_business.employee_name') }}</label>
                <el-form-item prop="employee_id">
                  <el-drag-select v-model="business.employee_id" :placeholder="$t('placeholder.salary_business_add.employee_name')">
                    <el-option v-for="(item, index) in employees" :label="item.name" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary_business.sales') }}</label>
                <el-form-item prop="sales">
                  <el-input :rows="1" v-model="business.sales" :placeholder="$t('placeholder.salary_business_add.sales')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary_business.amount') }}</label>
                <el-form-item prop="sales">
                  <el-input :rows="1" v-model="business.amount" :placeholder="$t('placeholder.salary_business_add.amount')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary_business.unit') }}</label>
                <el-form-item prop="sales">
                  <el-input :rows="1" v-model="business.unit" :placeholder="$t('placeholder.salary_business_add.unit')" type="text" class="article-textarea" autosize/>
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
              {{ businessId ? createBtn : updateBtn }}
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
  name: 'BusinessAdd',
  components: {
    ElDragSelect
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    businessId: {
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
      business: {
        employee_id: '',
        sales: '',
        amount: '',
        unit: '',
        id: ''
      },
      formData: new FormData(),
      employees: {},
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        employee_id: [{ validator: validateRequire }],
        sales: [{ validator: validateRequire }],
        amount: [{ validator: validateRequire }],
        unit: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.businessId) {
      this.getSalaryBusiness()
    }
    this.initial()
  },
  mounted() {
  },
  methods: {
    handError(rule) {
      return new Error(`${this.$t(`validation.salary_business.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.business.employee_id = response.employee_id
      this.business.sales = response.sales
      this.business.amount = response.amount
      this.business.unit = response.unit
      this.business.id = response.id
    },
    getSalaryBusiness() {
      rf.getRequest('SalaryBusinessRequest')
        .getSalaryBusiness({ id: this.businessId })
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
      _.forEach(this.business, (business, i) => {
        this.formData.append(`${i}`, business)
      })
      if (this.businessId) {
        return rf
          .getRequest('SalaryBusinessRequest')
          .update(this.formData)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('SalaryBusinessRequest')
        .store(this.formData)
        .then(res => {
          this.handleRespone(res)
        }).catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'SalaryBusiness' })
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
