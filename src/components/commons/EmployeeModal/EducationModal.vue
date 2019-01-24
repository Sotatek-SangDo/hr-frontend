<template>
  <div id="education-modal" class="modal fade show">
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
                      <label for="kni">Trình độ chuyên môn</label>
                      <select id="kni" v-model="user_education.qualification_id" class="form-control">
                        <option value="">Lựa chọn trình độ chuyên môn</option>
                        <option
                          v-for="(qua, index) in qualifications"
                          :key="index"
                          :value="qua.id"
                          v-text="qua.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Học viện</label>
                      <input id="detail-kni" v-model="user_education.institute" type="text" class="form-control" placeholder="Học viện">
                    </div>
                    <date-picker v-if="delay" :title="startedAt" v-model="user_education.started_at" :default="getDate(user_education.started_at)"/>
                    <date-picker v-if="delay" :title="endedAt" v-model="user_education.ended_at" :default="getDate(user_education.ended_at)"/>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
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
import DatePicker from '../../commons/DatePicker'
import MasterView from '../../../views/MasterView'
import _ from 'lodash'

export default {
  name: 'EducationModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number
    },
    education: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm học vấn',
      updateTitle: 'Chỉnh sửa học vấn',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
      qualifications: {},
      user_education: {
        qualification_id: '',
        institute: '',
        started_at: '',
        ended_at: '',
        emp_id: this.empId,
        id: ''
      },
      isDisable: false,
      errors: [],
      startedAt: 'Ngày bắt đầù',
      endedAt: 'Ngày hoàn thành',
      delay: false,
      modal_id: 'education-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    getQuatifications() {
      rf.getRequest('QualificationRequest')
        .getAll()
        .then(res => {
          this.qualifications = res
        })
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.user_education, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) {
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` })
        }
      })
      if (this.hasErrors()) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('EducationRequest')
          .update({ data: this.user_education })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eEducation', res.data)
            }
          })
      }
      rf.getRequest('EducationRequest')
        .store({ data: this.user_education })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eEducation', res.data)
          }
        })
    },
    clearData() {
      this.user_education = this.emptyData(this.user_education)
      this.isDisable = false
    },
    init() {
      this.user_education = this.education
      this.delay = true
      this.getQuatifications()
    }
  }
}
</script>
<style lang="sass" scoped></style>
