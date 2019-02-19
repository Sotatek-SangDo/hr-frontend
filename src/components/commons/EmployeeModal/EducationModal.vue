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
                  <el-form>
                    <div class="form-group">
                      <label for="kni">{{ $t('edu.qualification_title') }}</label>
                      <el-drag-select v-model="user_education.qualification_id" :placeholder="$t('edu.qualification_place')">
                        <el-option v-for="(q, index) in qualifications" :label="q.name" :value="q.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">{{ $t('edu.institute_title') }}</label>
                      <el-form-item style="margin-bottom: 30px;" prop="name">
                        <el-input :rows="1" v-model="user_education.institute" :placeholder="$t('edu.institute_title')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('edu.startedAt') }}</label>
                      <el-form-item prop="started_at">
                        <el-date-picker v-model="user_education.started_at" :placeholder="$t('edu.startedAt')" type="date" value-format="yyyy-MM-DD"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('edu.endedAt') }}</label>
                      <el-form-item prop="ended_at">
                        <el-date-picker v-model="user_education.ended_at" :placeholder="$t('edu.endedAt')" type="date" value-format="yyyy-MM-DD"/>
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
import DatePicker from '../../commons/DatePicker'
import MasterView from '@/views/MasterView'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'EducationModal',
  components: {
    DatePicker,
    ElDragSelect
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    education: {
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
      createTitle: this.$t('edu.add_title'),
      updateTitle: this.$t('edu.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      qualifications: this.$store.getters.qualifications,
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
      startedAt: this.$t('edu.startedAt'),
      endedAt: this.$t('edu.endedAt'),
      delay: false,
      modal_id: 'education-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onchange(date, $event) {
      console.log($event)
      console.log(date)
    },
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
          .update(this.user_education)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eEducation', res.data.data)
            }
          })
      }
      rf.getRequest('EducationRequest')
        .store(this.user_education)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eEducation', res.data.data)
          }
        }).catch(err => console.log(err))
    },
    clearData() {
      this.user_education = this.emptyData(this.user_education)
      this.isDisable = false
    },
    init() {
      this.user_education = this.education
      this.delay = true
    }
  }
}
</script>
<style lang="sass" scoped></style>
