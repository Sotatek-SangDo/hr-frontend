<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addEducation">
          <span class="icon"><svg-icon icon-class="plus-square"/></span>Trình độ chuyên môn
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userEducations" class="card-body">
          <div v-for="(edu, i) in userEducations" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading">{{ edu.qualification_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeEducation(edu)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(edu)">
                <svg-icon icon-class="edit" />
              </button>
            </h5>
            <p class="list-group-item-text">Ngaỳ bắt đầu: {{ edu.started_at }}</p>
            <p class="list-group-item-text">Ngày hoàn thành: {{ edu.ended_at }}</p>
            <p class="list-group-item-text">Học tại: {{ edu.institute }}</p>
          </div>
        </div>
      </div>
    </div>
    <education-modal v-if="isShow" :education="user_education" :is-create="isCreate" :emp-id="empId"/>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import MasterView from '@/views/MasterView'
import EducationModal from '../commons/EmployeeModal/EducationModal'

export default {
  name: 'AddEducations',
  components: {
    EducationModal
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      user_education: {
        qualification_id: '',
        institute: '',
        started_at: '',
        ended_at: '',
        emp_id: this.empId,
        id: ''
      },
      isShow: false,
      isCreate: true,
      userEducations: [],
      modal_id: 'education-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getEducations() {
      rf.getRequest('EducationRequest')
        .getEmployeeEducation({ id: this.empId })
        .then(res => {
          this.userEducations = res.data
        })
    },
    addEducation(e) {
      e.preventDefault()
      this.isCreate = true
      this.user_education.emp_id = this.empId
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(qualification) {
      this.isCreate = false
      Object.assign(
        this.user_education,
        this.setData(this.user_education, qualification)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    removeEducation(qualification) {
      if (confirm('Bạn có chắc muốn xóa trình đọ chuyên môn này?')) {
        rf.getRequest('EducationRequest')
          .destroy({ id: qualification.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eEducation', qualification)
            }
          })
      }
    },
    clearData() {
      this.user_education = this.emptyData(this.user_education)
    },
    init() {
      this.getEducations()
      this.onEventEducation()
    },
    onEventEducation() {
      window.EventBus.$on('update-eEducation', eEdu => {
        const index = this.userEducations.findIndex(s => s.id === eEdu.id)
        this.userEducations[index] = eEdu
        this.$forceUpdate()
      })
      window.EventBus.$on('add-eEducation', eEdu =>
        this.userEducations.push(eEdu)
      )
      window.EventBus.$on('delete-eEducation', eEdu => {
        const index = this.userEducations.findIndex(s => s.id === eEdu.id)
        this.userEducations.splice(index, 1)
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
