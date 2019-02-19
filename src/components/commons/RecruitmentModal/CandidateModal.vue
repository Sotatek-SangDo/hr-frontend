<template>
  <div id="candidate-modal" class="modal fade show">
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
                      <label>{{ $t('candidate.name') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="candidate.name" :placeholder="$t('candidate.name')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('candidate.birthday') }}</label>
                      <el-form-item prop="birthday">
                        <el-date-picker v-model="candidate.birthday" :placeholder="$t('candidate.birthday')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label for="kni">{{ $t('candidate.gender') }}</label>
                      <el-drag-select v-model="candidate.gender" :placeholder="$t('candidate.gender_select')">
                        <el-option v-for="(g, index) in gender" :label="g" :value="g" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('candidate.phone') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="candidate.phonenumber" :placeholder="$t('candidate.phone')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('candidate.email') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="candidate.email" :placeholder="$t('candidate.email')" type="email" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label for="kni">{{ $t('candidate.recruitment') }}</label>
                      <el-drag-select v-model="candidate.recruitment_id" :placeholder="$t('candidate.recruitment_select')">
                        <el-option v-for="(r, index) in recruitments" :label="r.name" :value="r.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="kni">{{ $t('candidate.job') }}</label>
                      <el-drag-select v-model="candidate.job_id" :placeholder="$t('candidate.job_select')">
                        <el-option v-for="(j, index) in jobs" :label="j.title" :value="j.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">{{ $t('candidate.note') }}</label>
                      <textarea v-model="candidate.description" class="form-control" />
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
  name: 'CandidateModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    propCandidate: {
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      createTitle: this.$t('candidate.add_title'),
      updateTitle: this.$t('candidate.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      candidate: {
        job_id: '',
        email: '',
        name: '',
        gender: '',
        birthday: '',
        phonenumber: '',
        description: '',
        id: '',
        recruitment_id: ''
      },
      gender: [
        this.$t('gender.male'),
        this.$t('gender.female'),
        this.$t('gender.orther')
      ],
      isDisable: false,
      errors: [],
      modal_id: 'candidate-modal',
      delay: false,
      recruitments: {},
      jobs: this.$store.getters.jobs
    }
  },
  created() {
    this.getRecruitments()
  },
  mounted() {
    this.init()
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date()
    },
    getRecruitments() {
      rf.getRequest('RecruitmentRequest')
        .getAll()
        .then(res => (this.recruitments = res.data))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      if (this.propCandidate.name) {
        this.candidate = this.propCandidate
      }
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id', 'description']
      _.forEach(this.candidate, (val, key) => {
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
          .getRequest('CandidateRequest')
          .update(this.candidate)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-candidate', res.data.data)
            }
          })
      }
      rf.getRequest('CandidateRequest')
        .store(this.candidate)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-candidate', res.data.data)
          }
        })
    },
    clearData() {
      this.cadidate = this.emptyData(this.candidate)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
