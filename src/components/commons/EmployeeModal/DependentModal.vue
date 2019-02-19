<template>
  <div id="dependent-modal" ref="add_modal" class="modal fade show">
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
                      <label>{{ $t('dependent.full_name') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_dependent.full_name" :placeholder="$t('dependent.full_name')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('dependent.relation') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_dependent.relationship" :placeholder="$t('dependent.relation')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">{{ $t('dependent.birthday') }}</label>
                      <el-form-item prop="birthday">
                        <el-date-picker v-model="user_dependent.birthday" :placeholder="$t('dependent.birthday')" type="date" value-format="yyyy-MM-dd"/>
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
import MasterView from '../../../views/MasterView'
import DatePicker from '../../commons/DatePicker'
import _ from 'lodash'

export default {
  name: 'DependentModal',
  components: {
    DatePicker
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    dependent: {
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
      createTitle: this.$t('dependent.add_title'),
      updateTitle: this.$t('dependent.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      user_dependent: {
        full_name: '',
        relationship: '',
        birthday: '',
        emp_id: '',
        id: ''
      },
      modal_id: 'dependent-modal',
      errors: [],
      isDisable: false,
      delay: false
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
      this.errors = []
      _.forEach(this.user_dependent, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.hasErrors()) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('DependentsRequest')
          .update(this.user_dependent)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eDependent', res.data.data)
            }
          })
      }
      rf.getRequest('DependentsRequest')
        .store(this.user_dependent)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eDependent', res.data.data)
          }
        })
    },
    clearData() {
      this.user_dependent = this.emptyData(this.user_dependent)
      this.isDisable = false
    },
    init() {
      this.user_dependent = this.dependent
      this.delay = true
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
