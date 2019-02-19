<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addDependent">
          <span class="icon"><svg-icon icon-class="plus-square"/></span>Người phụ thuộc
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userDependents" class="card-body">
          <div v-for="(dep, i) in userDependents" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading">{{ dep.full_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeDep(dep)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(dep)">
                <svg-icon icon-class="edit" />
              </button>
            </h5>
            <p class="list-group-item-text">Mối quan hệ: {{ dep.relationship }}</p>
            <p class="list-group-item-text">Ngày sinh: {{ dep.birthday }}</p>
          </div>
        </div>
      </div>
    </div>
    <dependent-modal v-if="isShow" :emp-id="empId" :dependent="user_dependent" :is-create="isCreate"/>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import MasterView from '@/views/MasterView'
import DependentModal from '../commons/EmployeeModal/DependentModal'

export default {
  name: 'AddDependenst',
  components: {
    DependentModal
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
      user_dependent: {
        full_name: '',
        relationship: '',
        birthday: '',
        emp_id: this.empId,
        id: ''
      },
      modal_id: 'dependent-modal',
      userDependents: [],
      isCreate: true,
      isShow: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getDependents() {
      rf.getRequest('DependentsRequest')
        .getEDependents({ id: this.empId })
        .then(res => {
          this.userDependents = res.data
        })
    },
    addDependent(e) {
      e.preventDefault()
      this.isCreate = true
      this.user_dependent.emp_id = this.empId
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(dependent) {
      this.isCreate = false
      Object.assign(
        this.user_dependent,
        this.setData(this.user_dependent, dependent)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    removeDep(dependent) {
      if (confirm('Bạn có chắc muốn xóa người phụ thuộc này?')) {
        rf.getRequest('DependentsRequest')
          .destroy({ id: dependent.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eDependent', dependent)
            }
          })
      }
    },
    clearData() {
      this.user_dependent = this.emptyData(this.user_dependent)
    },
    onEventDependent() {
      window.EventBus.$on('update-eDependent', eDep => {
        const index = this.userDependents.findIndex(c => c.id === eDep.id)
        this.userDependents[index] = eDep
        this.$forceUpdate()
      })
      window.EventBus.$on('add-eDependent', eDep =>
        this.userDependents.push(eDep)
      )
      window.EventBus.$on('delete-eDependent', eDep => {
        const index = this.userDependents.findIndex(c => c.id === eDep.id)
        this.userDependents.splice(index, 1)
      })
    },
    init() {
      this.getDependents()
      this.onEventDependent()
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
