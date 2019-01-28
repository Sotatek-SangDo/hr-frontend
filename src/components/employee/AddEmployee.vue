<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-xs-6 col-md-6">
              <div class="form-group">
                <label for="fullname" class="col-form-label">Họ và tên</label>
                <input id="fullname" v-model="emp.full_name" class="form-control" type="text" autocomplete="off" placeholder="Họ và tên">
              </div>
              <div class="form-group">
                <label class="col-form-label">Quốc Tịch</label>
                <select v-model="emp.nationality_id" class="form-control">
                  <option value="">Lựa chọn quốc tịch</option>
                  <option
                    v-for="(national, index) in nationalities"
                    :key="index"
                    :value="national.id"
                    v-text="national.name"/>
                </select>
              </div>
              <date-picker v-if="isShow" :title="birthday" v-model="emp.birthday" :default="getDate(emp.birthday)"/>
              <div class="form-group">
                <label class="col-form-label">Giới tính</label>
                <select v-model="emp.gender" class="form-control">
                  <option value="">Lựa chọn giới tính</option>
                  <option
                    v-for="(g, index) in gender"
                    :key="index"
                    :value="g"
                    v-text="g"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Tình trạng hôn nhân</label>
                <select v-model="emp.marital_status" class="form-control">
                  <option value="">Tình trạng hôn nhân</option>
                  <option
                    v-for="(ms, index) in maritalStatus"
                    :key="index"
                    :value="ms"
                    v-text="ms"/>
                </select>
              </div>
              <div class="form-group">
                <label for="ethnicity" class="col-form-label">Dân tộc</label>
                <input id="ethnicity" v-model="emp.ethnicity" class="form-control" type="text" autocomplete="off" placeholder="Nhập vào dân tộc ...">
              </div>
              <div class="form-group">
                <label for="address" class="col-form-label">Địa chỉ</label>
                <input id="address" v-model="emp.address" class="form-control" type="text" autocomplete="off" placeholder="Nhập vào địa chỉ ...">
              </div>
              <div class="form-group">
                <label class="col-form-label">Quốc gia</label>
                <select v-model="emp.country" class="form-control">
                  <option value="">Lựa chọn quốc gia</option>
                  <option
                    v-for="(national, index) in nationalities"
                    :key="index"
                    :value="national.id"
                    v-text="national.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Loại nhân viên</label>
                <select v-model="emp.status" class="form-control">
                  <option value="">Lựa chọn loại nhân viên</option>
                  <option
                    v-for="(s, index) in status"
                    :key="index"
                    :value="s.id"
                    v-text="s.status"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Công việc</label>
                <select v-model="emp.job" class="form-control">
                  <option value="">Lựa chọn công việc</option>
                  <option
                    v-for="(j, index) in jobs"
                    :key="index"
                    :value="j.id"
                    v-text="j.title"/>
                </select>
              </div>
            </div>
            <div class="col-xs-6 col-md-6">
              <div class="input-group mb-3">
                <label class="col-form-label one-line">Ảnh</label>
                <div class="custom-file">
                  <input id="avatar" type="file" class="custom-file-input" @change="onChooseAvatar">
                  <label class="custom-file-label" for="avatar" v-text="upload"/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Trả lương</label>
                <select v-model="emp.pay_grade" class="form-control">
                  <option value="">Lựa chọn trả lương</option>
                  <option
                    v-for="(p, index) in payGrades"
                    :key="index"
                    :value="p.id"
                    v-text="p.title"/>
                </select>
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Số điện thoại</label>
                <input id="phone" v-model="emp.phone" class="form-control" type="text" autocomplete="off" placeholder="Nhập vào số điện thoại ...">
              </div>
              <div class="form-group">
                <label for="private_email" class="col-form-label">Email cá nhân</label>
                <input id="private_email" v-model="emp.private_email" class="form-control" type="private_email" autocomplete="off" placeholder="Nhập vào email cá nhân ...">
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email công việc</label>
                <input id="email" v-model="emp.email" class="form-control" type="email" autocomplete="off" placeholder="Nhập vào email công việc ...">
              </div>
              <date-picker v-if="isShow" :title="joinAt" v-model="emp.joined_at" :default="getDate(emp.joined_at)"/>
              <date-picker v-if="isShow" :title="confirmAt" v-model="emp.confirmed_at" :default="getDate(emp.confirmed_at)"/>
              <div class="form-group">
                <label class="col-form-label">Phòng ban</label>
                <select v-model="emp.department" class="form-control">
                  <option value="">Lựa chọn phòng ban</option>
                  <option
                    v-for="(d, index) in departments"
                    :key="index"
                    :value="d.id"
                    v-text="d.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Người gián sát trực tiếp</label>
                <select v-model="emp.supervisor" class="form-control">
                  <option value="">Lựa chọn người giám sát trực tiếp</option>
                  <option
                    v-for="(d, index) in supervisor"
                    :key="index"
                    :value="d.id"
                    v-text="d.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Người gián sát gián tiếp</label>
                <select v-model="emp.indirect_supervisor" class="form-control">
                  <option value="">Lựa chọn người giám sát gián tiếp</option>
                  <option
                    v-for="(d, index) in supervisor"
                    :key="index"
                    :value="d.id"
                    v-text="d.name"/>
                </select>
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit">
              {{ isCreate ? createBtn : updateBtn }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '../../components/commons/DatePicker'
import rf from '../../requests/RequestFactory'
import _ from 'lodash'
import store from '@/store'

export default {
  name: 'AddEmployee',
  components: {
    DatePicker
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    isCreate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      emp: {
        full_name: '',
        nationality_id: '',
        birthday: '',
        gender: '',
        marital_status: '',
        ethnicity: '',
        address: '',
        country: '',
        phone: '',
        private_email: '',
        email: '',
        joined_at: '',
        confirmed_at: '',
        department: '',
        supervisor: '',
        indirect_supervisor: '',
        status: '',
        job: '',
        pay_grade: '',
        id: ''
      },
      formData: '',
      upload: 'Chọn ảnh',
      birthday: 'Ngày Sinh',
      joinAt: 'Ngày gia nhập',
      confirmAt: 'Ngày xác nhận',
      nationalities: {},
      gender: ['Nam', 'Nữ', 'Khác'],
      supervisor: {},
      maritalStatus: ['Độc thân', 'Đã kết hôn', 'Li dị', 'Khác'],
      departments: {},
      status: {},
      jobs: {},
      payGrades: {},
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: 'Thêm mới',
      updateBtn: 'Cập nhập'
    }
  },
  created() {
    if (!this.isCreate) {
      this.getEmp()
    }
  },
  mounted() {
    this.formData = new FormData()
    this.initial()
    
  },
  methods: {
    setData(response) {
      this.emp.full_name = response.name
      this.emp.nationality_id = response.nationality_id
      this.emp.birthday = response.birthday
      this.emp.gender = response.gender
      this.emp.marital_status = response.marital_status
      this.emp.ethnicity = response.ethnicity
      this.emp.address = response.address
      this.emp.country = response.country
      this.emp.phone = response.phone
      this.emp.private_email = response.private_email
      this.emp.email = response.work_email
      this.emp.joined_at = response.joined_at
      this.emp.confirmed_at = response.confirmed_at
      this.emp.department = response.department_id
      this.emp.supervisor = response.supervisor_id
      this.emp.indirect_supervisor = response.indirect_supervisor
      this.emp.status = response.status
      this.emp.job = response.job_id
      this.emp.pay_grade = response.paygrade_id
      this.emp.id = response.id
    },
    getEmp() {
      // const query = this.$route.query.id
      // rf.getRequest('EmployeeRequest')
      //   .getEmployee({ id: query })
      //   .then(res => {
      //     this.setData(res)
      //   })
    },
    onChooseAvatar(e) {
      this.upload = e.target.files[0].name
      this.formData.append('file', e.target.files[0])
    },
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    getNationalities() {
      store.dispatch('getAllNationalities').then(() => {
        this.nationalities = store.getters.nationalities
      })
    },
    getSupervisor() {
      // rf.getRequest('EmployeeRequest')
      //   .getAll()
      //   .then(res => {
      //     this.supervisor = res
      //   })
    },
    getEmployeeStatus() {
      store.dispatch('getAllEmployeeStatus').then(() => {
        this.status = store.getters.employeeStatus
      })
    },
    getJobs() {
      // rf.getRequest('JobRequest')
      //   .getAll()
      //   .then(res => {
      //     this.jobs = res
      //   })
    },
    getPayGrades() {
      // rf.getRequest('PayGradeRequest')
      //   .getAll()
      //   .then(res => {
      //     this.payGrades = res
      //   })
    },
    getDepartments() {
      // rf.getRequest('DepartmentRequest')
      //   .getAll()
      //   .then(res => (this.departments = res))
    },
    initial() {
      this.getNationalities()
      this.getSupervisor()
      this.getEmployeeStatus()
      this.getJobs()
      this.getPayGrades()
      this.getDepartments()
      this.isShow = true
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    submitForm() {
      this.isDisable = true
      this.errors = []
      const keyNullable = ['indirect_supervisor', 'supervisor']
      _.forEach(this.emp, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.hasErrors()) {
        this.isDisable = false
        return
      }
      _.forEach(this.emp, (emp, i) => {
        this.formData.append(`${i}`, emp)
      })
      if (!this.isCreate) {
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
        })
    },
    handleRespone(response) {
      response.status
        ? this.$router.push({ name: 'emp-list' })
        : this.errors.push({ keys: 'Lỗi chưa xác định trên server' })
    }
  }
}
</script>
<style scoped lang="sass">
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
