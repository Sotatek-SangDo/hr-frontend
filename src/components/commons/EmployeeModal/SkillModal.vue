<template>
  <div id="skill-modal" class="modal fade show">
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
                      <label for="kni">{{ $t('skill.title') }}</label>
                      <select id="kni" v-model="user_skill.skill_id" class="form-control">
                        <option value="">{{ $t('skill.select') }}</option>
                        <option
                          v-for="(s, index) in skills"
                          :key="index"
                          :value="s.id"
                          v-text="s.skill_name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">{{ $t('skill.detail') }}</label>
                      <textarea id="detail-kni" v-model="user_skill.detail" :placeholder="$t('skill.detail_place')" type="text" class="form-control" />
                    </div>
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
import rf from '@/api/commons/RequestFactory'
import MasterView from '../../../views/MasterView'
import _ from 'lodash'

export default {
  name: 'SkillModal',
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    skill: {
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
      createTitle: this.$t('skill.add_title'),
      updateTitle: this.$t('skill.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      user_skill: {
        skill_id: '',
        detail: '',
        emp_id: this.empId,
        id: ''
      },
      isDisable: false,
      skills: this.$store.getters.skills,
      errors: [],
      modal_id: 'skill-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.user_skill = this.skill
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.user_skill, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('SkillUserRequest')
          .update(this.user_skill)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eskill', res.data.data)
            }
          })
      }
      rf.getRequest('SkillUserRequest')
        .store(this.user_skill)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eskill', res.data.data)
          }
        })
    },
    clearData() {
      this.user_skill = this.emptyData(this.user_skill)
      this.isDisable = false
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
