<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addSkill">
          <span class="icon"><i class="ti-plus"/></span>Kỹ Năng
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userSkills" class="card-body">
          <div v-for="(s, i) in userSkills" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading">{{ s.skill }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeSkill(s)">
                <i class="ti-trash"/>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(s)">
                <i class="ti-marker-alt"/>
              </button>
            </h5>
            <p class="list-group-item-text">{{ s.detail }}</p>
          </div>
        </div>
      </div>
    </div>
    <skill-modal v-if="isShow" :skill="user_skill" :is-create="isCreate" :emp-id="empId"/>
  </div>
</template>

<script>
import rf from '../../requests/RequestFactory'
import MasterView from '../../views/MasterView'
import SkillModal from '../commons/EmployeeModal/SkillModal'

export default {
  name: 'AddSkill',
  components: {
    SkillModal
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number
    }
  },
  data() {
    return {
      user_skill: {
        skill_id: '',
        detail: '',
        emp_id: this.empId,
        id: ''
      },
      isCreate: true,
      isShow: false,
      userSkills: [],
      modal_id: 'skill-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getUserSkill() {
      rf.getRequest('SkillUserRequest')
        .getEmpSkill({ id: this.empId })
        .then(res => (this.userSkills = res))
    },
    addSkill(e) {
      e.preventDefault()
      this.isCreate = true
      this.user_skill.emp_id = this.empId
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(skill) {
      this.isCreate = false
      Object.assign(this.user_skill, this.setData(this.user_skill, skill))
      this.isShow = true
      this.addEventShowModal()
    },
    removeSkill(skill) {
      if (confirm('Bạn có chắc muốn xóa kỹ năng này')) {
        rf.getRequest('SkillUserRequest')
          .destroy({ id: skill.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eskill', skill)
            }
          })
      }
    },
    clearData() {
      this.user_skill = this.emptyData(this.user_skill)
    },
    init() {
      this.getUserSkill()
      this.onEventSkill()
    },
    onEventSkill() {
      window.EventBus.$on('update-eskill', eskill => {
        const index = this.userSkills.findIndex(s => s.id === eskill.id)
        this.userSkills[index] = eskill
        this.$forceUpdate()
      })
      window.EventBus.$on('add-eskill', eskill => this.userSkills.push(eskill))
      window.EventBus.$on('delete-eskill', eskill => {
        const index = this.userSkills.findIndex(s => s.id === eskill.id)
        this.userSkills.splice(index, 1)
      })
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
