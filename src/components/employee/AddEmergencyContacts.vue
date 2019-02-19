<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addContact">
          <span class="icon"><svg-icon icon-class="plus-square"/></span>{{ $t('emergency_contact.title') }}
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userContacts" class="card-body">
          <div v-for="(con, i) in userContacts" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading">{{ con.full_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeContact(con)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(con)">
                <svg-icon icon-class="edit" />
              </button>
            </h5>
            <p class="list-group-item-text">{{ $t('emergency_contact.relation') }}: {{ con.relationship }}</p>
            <p class="list-group-item-text">{{ $t('emergency_contact.phone_number') }}: {{ con.contact_phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <emergency-contact-modal v-if="isShow" :contact="user_contact" :is-create="isCreate" :emp-id="empId"/>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import MasterView from '@/views/MasterView'
import EmergencyContactModal from '../commons/EmployeeModal/EmergencyContactModal'

export default {
  name: 'AddEmergencyContact',
  components: {
    EmergencyContactModal
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
      user_contact: {
        full_name: '',
        relationship: '',
        contact_phone: '',
        emp_id: this.empId,
        id: ''
      },
      errors: [],
      isDisable: false,
      userContacts: [],
      isShow: false,
      modal_id: 'contact-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getEmergencyContacts() {
      rf.getRequest('EmergencyContactsRequest')
        .getEEmergencyContact({ id: this.empId })
        .then(res => {
          this.userContacts = res.data
        })
    },
    addContact(e) {
      e.preventDefault()
      this.isCreate = true
      this.user_contact.emp_id = this.empId
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(contact) {
      this.isCreate = false
      Object.assign(
        this.user_contact,
        this.setData(this.user_contact, contact)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    removeContact(contact) {
      if (confirm('Bạn có chắc muốn xóa liên lạc này?')) {
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
    onEventContact() {
      window.EventBus.$on('update-eContact', eContact => {
        const index = this.userContacts.findIndex(c => c.id === eContact.id)
        this.userContacts[index] = eContact
        this.$forceUpdate()
      })
      window.EventBus.$on('add-eContact', eContact =>
        this.userContacts.push(eContact)
      )
      window.EventBus.$on('delete-eContact', eContact => {
        const index = this.userContacts.findIndex(c => c.id === eContact.id)
        this.userContacts.splice(index, 1)
      })
    },
    init() {
      this.getEmergencyContacts()
      this.onEventContact()
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
