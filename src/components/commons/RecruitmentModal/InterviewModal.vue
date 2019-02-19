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
                  <el-form>
                    <div class="form-group">
                      <label for="kni">{{ $t('interview.candidate') }}</label>
                      <el-drag-select v-model="interview.candidate_id" :placeholder="$t('interview.candidate_select')">
                        <el-option v-for="(c, index) in candidates" :label="c.name" :value="c.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="kni">{{ $t('interview.interviewer') }}</label>
                      <el-drag-select v-model="interview.interviewer" :placeholder="$t('interview.interviewer_select')">
                        <el-option v-for="(e, index) in emps" :label="e.name" :value="e.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('interview.started_at') }}</label>
                      <el-form-item prop="started_at">
                        <el-date-picker v-model="interview.started_at" :placeholder="$t('interview.started_at')" disabled type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"/>
                      </el-form-item>
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
import DatePicker from '../DatePicker'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'InterviewModal',
  components: {
    DatePicker,
    ElDragSelect
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
      createTitle: this.$t('interview.add_title'),
      updateTitle: this.$t('interview.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
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
      flag: 0
    }
  },
  watch: {
  },
  created() {
    this.getEmployees()
    this.getCandidates()
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
    getCandidates() {
      rf.getRequest('CandidateRequest')
        .getAll()
        .then(res => (this.candidates = res.data))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.interview = this.propInterview
      this.interview.started_at = this.start
      this.interview.ended_at = this.end
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id', 'address']
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
          .update(this.interview)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-interview', res.data)
            }
          })
      }
      rf.getRequest('InterviewRequest')
        .store(this.interview)
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
