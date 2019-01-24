<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Kỹ Năng</h4>
      </div>
      <data-table ref="datatable" :get-data="getEmpSkills">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Kỹ Năng</th>
          <th>Chi tiết</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td
              v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
              :rowspan="props.item.employee.count_skill"
              v-text="props.item.name"/>
            <td v-text="props.item.skill" />
            <td v-text="props.item.detail"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeSkill(props.item)">
                <i class="ti-trash"/>
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <i class="ti-marker-alt"/>
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addSkill(props.item)">
                <i class="ti-plus"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
      <skill-modal v-if="isShow" :skill="user_skill" :is-create="isCreate" :emp-id="empId"/>
    </div>
  </div>
</template>

<script>
import rf from '../../requests/RequestFactory'
import DataTable from '../commons/DataTable'
import MasterView from '../../views/MasterView'
import SkillModal from '../commons/EmployeeModal/SkillModal'

export default {
  name: 'EmployeeSkill',
  components: {
    DataTable,
    SkillModal
  },
  extends: MasterView,
  data() {
    return {
      user_skill: {
        skill_id: '',
        detail: '',
        emp_id: '',
        id: ''
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: 'skill-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getEmpSkills() {
      return rf.getRequest('SkillUserRequest').getAll()
    },
    addSkill(skill) {
      this.user_skill.emp_id = skill.emp_id
      this.empId = skill.emp_id
      this.isCreate = true
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
      if (confirm('Bạn có chắc muốn xóa kỹ năng này?')) {
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
    tableRefresh() {
      this.$refs.datatable.refresh()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-eskill', () => this.tableRefresh())
      window.EventBus.$on('update-eskill', () => this.tableRefresh())
      window.EventBus.$on('delete-eskill', () => this.tableRefresh())
    }
  }
}
</script>

<style lang="sass" scoped>
.header-title
  font-size: 24px
table
  tr
    th
      text-align: left
    td
      text-align: left
      padding-left: 20px !important
.epm-tb-header
  margin: 20px auto
</style>
