<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="department" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="form-group">
                <label class="col-form-label">{{ $t('department.name') }}</label>
                <el-form-item prop="name">
                  <el-input :rows="1" v-model="department.name" :placeholder="$t('placeholder.department_add.name')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('department.email') }}</label>
                <el-form-item prop="email">
                  <el-input :rows="1" v-model="department.email" :placeholder="$t('placeholder.department_add.email')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('department.phone_number') }}</label>
                <el-form-item prop="phone_number">
                  <el-input :rows="1" v-model="department.phone_number" :placeholder="$t('placeholder.department_add.phone_number')" type="text" class="article-textarea" autosize/>
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
              {{ departmentId ? createBtn : updateBtn }}
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

export default {
  name: 'DepartmentAdd',
  props: {
    header: {
      type: String,
      default: ''
    },
    departmentId: {
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
      department: {
        name: '',
        email: '',
        phone_number: '',
        id: ''
      },
      formData: new FormData(),
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        name: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }],
        phone_number: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.departmentId) {
      this.getDepartment()
    }
    this.initial()
  },
  mounted() {
  },
  methods: {
    handError(rule) {
      return new Error(`${this.$t(`validation.department.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.department.name = response.name
      this.department.email = response.email
      this.department.phone_number = response.phone_number
      this.department.id = response.id
    },
    getDepartment() {
      rf.getRequest('DepartmentRequest')
        .getDepartment({ id: this.departmentId })
        .then(res => {
          this.setData(res.data)
        })
    },
    initial() {
      this.isShow = true
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
      this.department.department_code = `HĐ${this.department.department_code}`
      _.forEach(this.department, (department, i) => {
        this.formData.append(`${i}`, department)
      })
      if (this.departmentId) {
        return rf
          .getRequest('DepartmentRequest')
          .update(this.formData)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('DepartmentRequest')
        .store(this.formData)
        .then(res => {
          this.handleRespone(res)
        }).catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'Department' })
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
