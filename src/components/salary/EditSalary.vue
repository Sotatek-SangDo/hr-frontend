<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="salary" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary.salary_basic') }}</label>
                <el-form-item>
                  <el-drag-select v-model="salary.salary_basic" :placeholder="$t('placeholder.salary_add.salary_basic')">
                    <el-option v-for="(item, index) in salaryBasic" :label="item.type" :value="item.subsidy" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary.salary_insurance') }}</label>
                <el-form-item >
                  <el-drag-select v-model="salary.salary_insurance_id" :placeholder="$t('placeholder.salary_add.salary_insurance')">
                    <el-option v-for="(item, index) in salaryInsurances" :label="item.insurance" :value="item.id" :key="index" />
                  </el-drag-select>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary.apply_date') }}</label>
                <el-form-item prop="apply_date">
                  <el-date-picker v-model="salary.apply_date" :placeholder="$t('placeholder.salary_add.apply_date')" type="date" value-format="yyyy-MM-dd"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('salary.notes') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="salary.notes" :placeholder="$t('placeholder.salary_add.notes')" type="text" class="article-textarea" autosize/>
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
              {{ salaryId ? createBtn : updateBtn }}
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

const SALARY_BASIC = [
  {
    'type': 'Mức 1',
    'subsidy': '10000000'
  },
  {
    'type': 'Mức 2',
    'subsidy': '20000000'
  },
  {
    'type': 'Mức 3',
    'subsidy': '30000000'
  }
]

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
    salaryId: {
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
      salary: {
        salary_basic: '',
        salary_insurance_id: '',
        notes: '',
        apply_date: '',
        id: ''
      },
      salaryBasic: SALARY_BASIC,
      formData: new FormData(),
      salaryInsurances: this.$store.getters.salaryInsurance,
      isDisable: false,
      employee: {},
      errors: [],
      isShow: false,
      isEdit: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        salary_basic: [{ validator: validateRequire }],
        salary_insurance_id: [{ validator: validateRequire }],
        salary_notes: [{ validator: validateRequire }],
        apply_date: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.salaryId) {
      this.getSalary()
    }
    this.isShow = true

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
      return new Error(`${this.$t(`validation.salary.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.salary.salary_insurance_id = response.salary_insurance_id
      this.salary.salary_basic = response.salary_basic
      this.salary.notes = response.notes
      this.salary.apply_date = response.apply_date
      this.salary.id = response.id
      this.employee = response.employee.employee
    },
    getSalary() {
      rf.getRequest('SalaryRequest')
        .getSalary({ id: this.salaryId })
        .then(res => {
          this.setData(res.data)
        })
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
      _.forEach(this.salary, (salary, i) => {
        this.formData.append(`${i}`, salary)
      })

      return rf
        .getRequest('SalaryRequest')
        .update(this.formData)
        .then(res => {
          this.handleRespone(res)
        })
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'Salary' })
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
