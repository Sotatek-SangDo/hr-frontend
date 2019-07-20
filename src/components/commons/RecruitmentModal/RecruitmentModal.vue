<template>
  <div id="recruitment-modal" class="modal fade show">
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
                      <label>{{ $t('recruitment.title') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="recruit.name" :placeholder="$t('recruitment.title')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('recruitment.started_at') }}</label>
                      <el-form-item prop="started_at">
                        <el-date-picker v-model="recruit.started_at" :placeholder="$t('recruitment.started_at')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('recruitment.ended_at') }}</label>
                      <el-form-item prop="ended_at">
                        <el-date-picker v-model="recruit.ended_at" :placeholder="$t('recruitment.ended_at')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('recruitment.expired_at') }}</label>
                      <el-form-item prop="expired_at">
                        <el-date-picker v-model="recruit.expired_at" :placeholder="$t('recruitment.expired_at')" type="date" value-format="yyyy-MM-dd"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('recruitment.num') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="recruit.num" :placeholder="$t('recruitment.num')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('recruitment.status.title') }}</label>
                      <el-drag-select v-model="recruit.status" :placeholder="$t('recruitment.status.select')">
                        <el-option v-for="(s, index) in status" :label="s" :value="s" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">{{ $t('recruitment.info') }}</label>
                      <textarea v-model="recruit.recruitment_required" :placeholder="$t('recruitment.info')" class="form-control"/>
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
  name: 'InsuranceModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    recruitment: {
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
      createTitle: this.$t('recruitment.add_title'),
      updateTitle: this.$t('recruitment.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      recruit: {
        name: '',
        started_at: '',
        ended_at: '',
        status: '',
        expired_at: '',
        num: '',
        recruitment_required: '',
        id: ''
      },
      isDisable: false,
      emps: {},
      errors: [],
      modal_id: 'recruitment-modal',
      delay: false,
      jobs: {},
      status: [
        this.$t('recruitment.status.st1'),
        this.$t('recruitment.status.st2')
      ]
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
    init() {
      this.recruit = this.recruitment
      this.delay = true
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id', 'recruitment_required']
      _.forEach(this.recruit, (val, key) => {
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
          .getRequest('RecruitmentRequest')
          .update(this.recruit)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-recruitment', res.data.data)
            }
          })
      }
      rf.getRequest('RecruitmentRequest')
        .store(this.recruit)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-recruitment', res.data.data)
          }
        })
    },
    clearData() {
      this.recruit = this.emptyData(this.recruit)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
