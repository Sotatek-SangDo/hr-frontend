<template>
  <div id="certification-modal" ref="add_modal" class="modal fade show">
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
                      <select id="kni" v-model="user_certification.certification_id" class="form-control">
                        <option value="">Lựa chọn trình độ chuyên môn</option>
                        <option
                          v-for="(cer, index) in certifications"
                          :key="index"
                          :value="cer.id"
                          v-text="cer.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Nơi học</label>
                      <input id="detail-kni" v-model="user_certification.institute" type="text" class="form-control" placeholder="Nơi học">
                    </div>
                    <date-picker v-if="delay" :title="grantedOn" v-model="user_certification.granted_on" :default="getDate(user_certification.granted_on)"/>
                    <date-picker v-if="delay" :title="validTo" v-model="user_certification.valid_to" :default="getDate(user_certification.valid_to)"/>
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
import DatePicker from '../DatePicker'
import MasterView from '../../../views/MasterView'
import _ from 'lodash'

export default {
  name: 'CertificationModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number
    },
    certification: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm chứng chỉ',
      updateTitle: 'Chỉnh sửa chứng chỉ',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
      certifications: {},
      user_certification: {
        certification_id: '',
        institute: '',
        granted_on: '',
        valid_to: '',
        emp_id: this.empId,
        id: ''
      },
      isDisable: false,
      errors: [],
      grantedOn: 'Ngày cấp',
      validTo: 'Ngày hết hạn',
      delay: false,
      modal_id: 'certification-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    getCertifications() {
      rf.getRequest('CertificationRequest')
        .getAll()
        .then(res => {
          this.certifications = res
        })
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.user_certification, (val, key) => {
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
          .getRequest('CertificationUserRequest')
          .update({ data: this.user_certification })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eCertification', res.data)
            }
          })
      }
      rf.getRequest('CertificationUserRequest')
        .store({ data: this.user_certification })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eCertification', res.data)
          }
        })
    },
    clearData() {
      this.user_dependent = this.emptyData(this.user_dependent)
      this.isDisable = false
    },
    init() {
      this.user_certification = this.certification
      this.delay = true
      this.getCertifications()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
