<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-skill">
          <span class="icon"><svg-icon icon-class="plus-square"/></span>Documents
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userSkills" class="card-body">
          <div v-for="(s, i) in userSkills" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading">{{ s.skill }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeSkill(s)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(s)">
                <svg-icon icon-class="edit" />
              </button>
            </h5>
            <p class="list-group-item-text">{{ s.detail }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="add-skill" ref="add_modal" class="modal fade show">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới kỹ năng</h5>
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mt-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit.prevent="store">
                      <div class="form-group">
                        <label for="kni">Kĩ năng</label>
                        <select id="kni" v-model="user_skill.skill_id" class="form-control">
                          <option value="">Lựa chọn kỹ năng</option>
                          <option
                            v-for="(s, index) in skills"
                            :key="index"
                            :value="s.id"
                            v-text="s.skill_name"/>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Thông tin chi tiết</label>
                        <textarea id="detail-kni" v-model="user_skill.detail" type="text" class="form-control" placeholder="Thông tin chi tiết"/>
                      </div>
                      <div v-if="hasErrors()" class="errors">
                        <span v-text="errors[0].keys"/>
                      </div>
                      <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4"><i class="ti-save"/> Lưu</button>
                    </form>
                  </div>
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
import $ from 'jquery'
import _ from 'lodash'

export default {
  name: 'AddSkill',
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      skills: {},
      user_skill: {
        skill_id: '',
        detail: '',
        emp_id: this.empId,
        id: ''
      },
      errors: [],
      isDisable: false,
      userSkills: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getUserSkill() {
      rf.getRequest('SkillUserRequest')
        .getAll()
        .then(res => (this.userSkills = res.data))
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    store(e) {
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
      if (this.user_skill.id) {
        return rf
          .getRequest('SkillUserRequest')
          .update(this.user_skill)
          .then(res => {
            if (res.status) {
              const index = this.userSkills.findIndex(
                s => s.id === this.user_skill.id
              )
              this.userSkills[index] = res.data
              this.clearData()
              $(this.$refs.add_modal).modal('hide')
            }
          })
      }
      rf.getRequest('SkillUserRequest')
        .store(this.user_skill)
        .then(res => {
          if (res.status) {
            this.clearData()
            $(this.$refs.add_modal).modal('hide')
            this.userSkills.push(res.data)
          }
        })
    },
    showModalUpdate(skill) {
      this.user_skill.skill_id = skill.skill_id
      this.user_skill.detail = skill.detail
      this.user_skill.id = skill.id
      $(this.$refs.add_modal).modal('show')
    },
    removeSkill(skill) {
      rf.getRequest('SkillUserRequest')
        .destroy({ id: skill.id })
        .then(res => {
          if (res.status) {
            this.userSkills.splice(this.userSkills.indexOf(skill), 1)
          }
        })
    },
    clearData() {
      this.user_skill.skill_id = ''
      this.user_skill.detail = ''
      this.user_skill.id = ''
      this.isDisable = false
    },
    init() {
      this.getUserSkill()
      $(this.$refs.add_modal).on(
        'hidden.bs.modal',
        function() {
          this.clearData()
        }.bind(this)
      )
    }
  }
}
</script>

<style lang="sass">
button::disabled
  cursor: not-allowed
#detail-kni
  resize: none;
.form-group
  margin-bottom: 10px
a.icon-p
  font-weight: 800
  font-size: 22px !important
  span.icon
    background: #fff
    height: 30px
    width: 30px
    display: inline-block
    color: #8148fd
    font-size: 22px
    font-weight: 900
    padding-left: 4px
    margin-right: 30px
.but
  border: 1px solid #bfbfbf
  color: blue
  font-size: 20px
  background-color: transparent
  position: absolute
  top: 0
  padding: 5px
  cursor: pointer
  &.but-del
    right: 0
    border-right: none
    border-left: none
    border-top: none
  &.but-edit
    right: 30px
    border-top: none
    border-radius: 0 0 0 5px
</style>
