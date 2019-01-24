<template>
  <div id="interview-modal" class="modal fade show">
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
                      <label class="col-form-label">Ứng viên</label>
                      <select v-model="interview.candidate_id" class="form-control">
                        <option value="">Lựa chọn ứng viên</option>
                        <option
                          v-for="(c, index) in candidates"
                          :key="index"
                          :value="c.id"
                          v-text="c.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">Người phỏng vấn</label>
                      <select v-model="interview.interviewer" class="form-control">
                        <option value="">Lựa chọn người phỏng vấn</option>
                        <option
                          v-for="(e, index) in emps"
                          :key="index"
                          :value="e.id"
                          v-text="e.name"/>
                      </select>
                    </div>
                    <date-picker v-if="delay" :title="startedAt" v-model="time" :default="getDate(time)" :format="'yyyy-mm-dd'"/>
                    <div class="form-group">
                      <label for="detail-kni">Gio</label>
                      <input v-model="hours" type="text" class="form-control" placeholder="Gio bat dau" readonly>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Địa chỉ</label>
                      <input v-model="interview.address" type="text" class="form-control" placeholder="Địa chỉ" >
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
  name: 'InterviewModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    propInterview: {
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      createTitle: 'Thêm mới',
      updateTitle: 'Chỉnh sửa',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
      interview: {
        candidate_id: '',
        started_at: '',
        ended_at: '',
        interviewer: '',
        address: '',
        id: ''
      },
      startedAt: 'Bắt đầu lúc',
      isDisable: false,
      errors: [],
      modal_id: 'interview-modal',
      delay: false,
      emps: {},
      candidates: {},
      time: '',
      hours: '',
      flag: 0
    }
  },
  watch: {
    hours(newVal, oldVal) {
      if (newVal.length === 2 && !this.flag) {
        this.flag = 1
        if (parseInt(newVal) > 12) newVal = '00'
        this.hours = `${newVal}:`
      }
      if (!newVal.length || newVal.length < 2) return (this.flag = 0)
      if (newVal.length > 5) return (this.hours = oldVal)
      if (newVal.length === 5) {
        const split = newVal.split(':')
        if (parseInt(split[1]) >= 60) this.hours = `${split[0]}:00`
        this.interview.started_at = `${this.time} ${this.hours}`
      }
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
    getCandidates() {
      rf.getRequest('CandidateRequest')
        .getAll()
        .then(res => (this.candidates = res))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.interview = this.propInterview
      if (this.interview.started_at) {
        const split = this.interview.started_at.split(' ')
        this.time = split[0]
        this.hours = split[1].substring(0, split[1].length - 3)
      } else {
        if (this.end) {
          this.interview.ended_at = this.end
        }
        if (this.start) {
          const split = this.start.split(' ')
          this.time = split[0]
          this.hours = split[1]
        }
      }
      this.getEmployees()
      this.getCandidates()
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id', 'description']
      _.forEach(this.interview, (val, key) => {
        let i = 0
        if (!i) this.errors = []
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
        i++
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('InterviewRequest')
          .update({ data: this.interview })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-interview', res.data)
            }
          })
      }
      rf.getRequest('InterviewRequest')
        .store({ data: this.interview })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-interview', res.data)
          }
        })
    },
    clearData() {
      this.interview = this.emptyData(this.interview)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
