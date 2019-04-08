<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="emp" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-4 col-md-4">
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.name') }}</label>
                <el-form-item style="margin-bottom: 30px;" prop="name">
                  <el-input :rows="1" v-model="emp.name" :placeholder="$t('placeholder.employee_add.name')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.nationality') }}</label>
                <el-drag-select v-model="emp.nationality_id" :placeholder="$t('placeholder.employee_add.nationality')">
                  <el-option v-for="(item, index) in nationalities" :label="item.name" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.birthday') }}</label>
                <el-form-item prop="birthday">
                  <el-date-picker v-model="emp.birthday" :placeholder="$t('placeholder.employee_add.date')" type="date"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.gender') }}</label>
                <el-drag-select v-model="emp.gender" :placeholder="$t('placeholder.employee_add.gender')">
                  <el-option v-for="(item, index) in gender" :label="item" :value="item" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.marital') }}</label>
                <el-drag-select v-model="emp.marital_status" :placeholder="$t('placeholder.employee_add.marital')">
                  <el-option v-for="(item, index) in maritalStatus" :label="item" :value="item" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.ethnicity') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="emp.ethnicity" :placeholder="$t('placeholder.employee_add.ethnicity')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.address') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="emp.address" :placeholder="$t('placeholder.employee_add.address')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
            </div>
            <div class="col-xs-4 col-md-4">
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.country') }}</label>
                <el-drag-select v-model="emp.country" :placeholder="$t('placeholder.employee_add.country')">
                  <el-option v-for="(item, index) in nationalities" :label="item.name" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.status') }}</label>
                <el-drag-select v-model="emp.status" :placeholder="$t('placeholder.employee_add.status')">
                  <el-option v-for="(item, index) in status" :label="item.status" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.job') }}</label>
                <el-drag-select v-model="emp.job_id" :placeholder="$t('placeholder.employee_add.job')">
                  <el-option v-for="(item, index) in jobs" :label="item.title" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="input-group mb-3">
                <label class="col-form-label one-line">{{ $t('employee.avatar') }}</label>
                <div class="custom-file">
                  <input id="avatar" type="file" class="custom-file-input" @change="onChooseAvatar">
                  <label class="custom-file-label" for="avatar" v-text="upload"/>
                </div>
              </div>
              <el-form-item prop="avatar">
                <el-input v-model="emp.avatar" type="text" class="article-textarea" style="display: none;"/>
              </el-form-item>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.paygrade') }}</label>
                <el-drag-select v-model="emp.paygrade_id" :placeholder="$t('placeholder.employee_add.paygrade')">
                  <el-option v-for="(item, index) in payGrades" :label="item.title" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">{{ $t('employee.phone') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="emp.phone" :placeholder="$t('placeholder.phone')" type="text" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label for="private_email" class="col-form-label">{{ $t('employee.private_email') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="emp.private_email" :placeholder="$t('placeholder.email')" type="email" class="article-textarea" autosize/>
                </el-form-item>
              </div>
            </div>
            <div class="col-xs-4 col-md-4">
              <div class="form-group">
                <label for="email" class="col-form-label">{{ $t('employee.work_email') }}</label>
                <el-form-item>
                  <el-input :rows="1" v-model="emp.work_email" :placeholder="$t('placeholder.email')" type="email" class="article-textarea" autosize/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.joinAt') }}</label>
                <el-form-item prop="joined_at">
                  <el-date-picker v-model="emp.joined_at" :placeholder="$t('placeholder.employee_add.date')" type="date"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.confirmAt') }}</label>
                <el-form-item prop="confirmed_at">
                  <el-date-picker v-model="emp.confirmed_at" :placeholder="$t('placeholder.employee_add.date')" type="date"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.department') }}</label>
                <el-drag-select v-model="emp.department_id" :placeholder="$t('placeholder.employee_add.department')">
                  <el-option v-for="(item, index) in departments" :label="item.name" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.supervisor') }}</label>
                <el-drag-select v-model="emp.supervisor_id" :placeholder="$t('placeholder.employee_add.supervisor')">
                  <el-option v-for="(item, index) in supervisor" :label="item.name" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('employee.indirect_supervisor') }}</label>
                <el-drag-select v-model="emp.indirect_supervisor" :placeholder="$t('placeholder.employee_add.indirect_supervisor')">
                  <el-option v-for="(item, index) in supervisor" :label="item.name" :value="item.id" :key="index" />
                </el-drag-select>
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit" @click="submitForm">
              {{ empId ? createBtn : updateBtn }}
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
  name: 'EmployeeAdd',
  components: {
    ElDragSelect
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    empId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      console.log(value, '>>>>>>>>>>>>>>', rule)
      if (value === '' || !value) {
        if (rule.field === 'avatar' && this.upload !== this.$t('placeholder.employee_add.avatar')) {
          callback()
        }
        callback(this.handError(rule))
      } else {
        callback()
      }
    }
    return {
      upload: this.$t('placeholder.employee_add.avatar'),
      emp: {
        name: '',
        nationality_id: '',
        birthday: '',
        gender: '',
        marital_status: '',
        ethnicity: '',
        address: '',
        country: '',
        phone: '',
        private_email: '',
        work_email: '',
        joined_at: '',
        confirmed_at: '',
        department_id: '',
        supervisor_id: '',
        indirect_supervisor: '',
        status: '',
        job_id: '',
        paygrade_id: '',
        id: ''
      },
      formData: new FormData(),
      nationalities: this.$store.getters.nationalities,
      gender: ['Nam', 'Nữ', 'Khác'],
      supervisor: {},
      maritalStatus: ['Độc thân', 'Đã kết hôn', 'Li dị', 'Khác'],
      departments: this.$store.getters.departments,
      status: this.$store.getters.employeeStatus,
      jobs: this.$store.getters.jobs,
      payGrades: this.$store.getters.paygrades,
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        name: [{ validator: validateRequire }],
        nationality_id: [{ validator: validateRequire }],
        birthday: [{ validator: validateRequire }],
        gender: [{ validator: validateRequire }],
        ethnicity: [{ validator: validateRequire }],
        marital_status: [{ validator: validateRequire }],
        address: [{ validator: validateRequire }],
        country: [{ validator: validateRequire }],
        phone: [{ validator: validateRequire }],
        work_email: [{ validator: validateRequire }],
        joined_at: [{ validator: validateRequire }],
        confirmed_at: [{ validator: validateRequire }],
        department_id: [{ validator: validateRequire }],
        job_id: [{ validator: validateRequire }],
        pay_grade: [{ validator: validateRequire }],
        status: [{ validator: validateRequire }],
        avatar: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
  },
  created() {
    if (this.empId) {
      this.getEmp()
    }
    this.initial()
  },
  mounted() {
  },
  methods: {
    handError(rule) {
      return new Error(`${this.$t(`validation.fields.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
      this.emp.name = response.name
      this.emp.nationality_id = response.nationality_id
      this.emp.birthday = response.birthday
      this.emp.gender = response.gender
      this.emp.marital_status = response.marital_status
      this.emp.ethnicity = response.ethnicity
      this.emp.address = response.address
      this.emp.country = response.country
      this.emp.phone = response.phone
      this.emp.private_email = response.private_email
      this.emp.work_email = response.work_email
      this.emp.joined_at = response.joined_at
      this.emp.confirmed_at = response.confirmed_at
      this.emp.department_id = response.department_id
      this.emp.supervisor_id = response.supervisor_id
      this.emp.indirect_supervisor = response.indirect_supervisor
      this.emp.status = response.status
      this.emp.job = response.job_id
      this.emp.paygrade_id = response.paygrade_id
      this.emp.id = response.id
    },
    getEmp() {
      rf.getRequest('EmployeeRequest')
        .getEmployee({ id: this.empId })
        .then(res => {
          this.setData(res.data)
        })
    },
    onChooseAvatar(e) {
      this.upload = e.target.files[0].name
      this.formData.append('file', e.target.files[0])
    },
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    initial() {
      this.getSupervisor()
      this.isShow = true
    },
    getSupervisor() {
      rf.getRequest('EmployeeRequest')
        .getList()
        .then(res => (this.supervisor = res.data))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    submitForm(e) {
      e.preventDefault()
      this.isDisable = true
      this.$refs['postForm'].validate((valid) => {
        if (!valid) {
          this.isDisable = false
        }
      })
      if (!this.isDisable) return
      _.forEach(this.emp, (emp, i) => {
        this.formData.append(`${i}`, emp)
      })
      if (this.empId) {
        return rf
          .getRequest('EmployeeRequest')
          .update(this.formData)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('EmployeeRequest')
        .store(this.formData)
        .then(res => {
          this.handleRespone(res)
        }).catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? this.$router.push({ name: 'Employee' })
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
