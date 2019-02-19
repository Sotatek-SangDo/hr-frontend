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
                  <el-form>
                    <div class="form-group">
                      <label for="kni">{{ $t('cer.title') }}</label>
                      <el-drag-select v-model="user_certification.certification_id" :placeholder="$t('cer.select')">
                        <el-option v-for="(c, index) in certifications" :label="c.name" :value="c.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">{{ $t('cer.institute') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_certification.institute" :placeholder="$t('cer.institute_place')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('cer.grantedOn') }}</label>
                      <el-form-item prop="granted_on">
                        <el-date-picker v-model="user_certification.granted_on" :placeholder="$t('cer.grantedOn')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('cer.validTo') }}</label>
                      <el-form-item prop="valid_to">
                        <el-date-picker v-model="user_certification.valid_to" :placeholder="$t('cer.validTo')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
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
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'CertificationModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    certification: {
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      createTitle: this.$t('cer.add_title'),
      updateTitle: this.$t('cer.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      certifications: this.$store.getters.certifications,
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
          .update(this.user_certification)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eCertification', res.data.data)
            }
          })
      }
      rf.getRequest('CertificationUserRequest')
        .store(this.user_certification)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eCertification', res.data.data)
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
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
