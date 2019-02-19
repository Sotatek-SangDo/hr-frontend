<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Danh bạ khẩn cấp</h4>
      </div>
      <data-table ref="datatable" :get-data="getEmergencyContacts">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Người liên hệ</th>
          <th>Mối quan hệ</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td
              v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
              :rowspan="props.item.employee.count_contact"
              v-text="props.item.name"/>
            <td v-text="props.item.full_name" />
            <td v-text="props.item.relationship" />
            <td v-text="props.item.contact_phone"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeContact(props.item)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <svg-icon icon-class="edit" />
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addContact(props.item)">
                <svg-icon icon-class="plus-square"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
      <emergency-contact-modal v-if="isShow" :contact="user_contact" :is-create="isCreate" :emp-id="empId"/>
    </div>
  </div>
</template>

<script>
import rf from '../../requests/RequestFactory'
import DataTable from '../commons/DataTable'
import MasterView from '@/views/MasterView'
import EmergencyContactModal from '../commons/EmployeeModal/EmergencyContactModal'

export default {
  name: 'EmployeeEmergencyContact',
  components: {
    DataTable,
    EmergencyContactModal
  },
  extends: MasterView,
  data() {
    return {
      user_contact: {
        full_name: '',
        relationship: '',
        contact_phone: '',
        emp_id: this.empId,
        id: ''
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: 'contact-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getEmergencyContacts() {
      return rf.getRequest('EmergencyContactsRequest').getAll()
    },
    addContact(contact) {
      this.user_contact.emp_id = contact.emp_id
      this.empId = contact.emp_id
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(certification) {
      this.isCreate = false
      Object.assign(
        this.user_contact,
        this.setData(this.user_contact, certification)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    removeContact(contact) {
      if (confirm('Bạn có chắc muốn xóa danh bạ này?')) {
        rf.getRequest('EmergencyContactsRequest')
          .destroy({ id: contact.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eContact', contact)
            }
          })
      }
    },
    clearData() {
      this.user_contact = this.emptyData(this.user_contact)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-eContact', () => this.tableRefresh())
      window.EventBus.$on('update-eContact', () => this.tableRefresh())
      window.EventBus.$on('delete-eContact', () => this.tableRefresh())
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
