<template>
  <div id="contact-modal" ref="add_modal" class="modal fade show">
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
                      <label for="detail-kni">Họ và tên:</label>
                      <input id="detail-kni" v-model="user_contact.full_name" type="text" class="form-control" placeholder="Họ và tên">
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Mối quan hệ:</label>
                      <input id="detail-kni" v-model="user_contact.relationship" type="text" class="form-control" placeholder="Mỗi quan hệ">
                    </div>
                    <div class="form-gruop">
                      <label for="">Số điện thoaị:</label>
                      <input
                        v-model="user_contact.contact_phone"
                        type="text"
                        class="form-control"
                        placeholder="Số điện thoại">
                    </div>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
                    </div>
                    <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4">
                      <i class="ti-save"/>{{ isCreate ? btnCreate : btnUpdate }}
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
import rf from '../../../requests/RequestFactory'
import MasterView from '../../../views/MasterView'
import _ from 'lodash'

export default {
  name: 'EmergencyContactModal',
  extends: MasterView,
  props: {
    empId: {
      type: Number
    },
    contact: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  data() {
    return {
      createTitle: 'Thêm danh bạ khẩn cấp',
      updateTitle: 'Chỉnh sửa danh bạ khẩn cấp',
      btnCreate: 'Lưu',
      btnUpdate: 'Cập nhập',
      user_contact: {
        full_name: '',
        relationship: '',
        contact_phone: '',
        emp_id: this.empId,
        id: ''
      },
      isDisable: false,
      errors: [],
      modal_id: 'contact-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.user_contact, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) {
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` })
        }
      })
      if (this.hasErrors()) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('EmergencyContactsRequest')
          .update({ data: this.user_contact })
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eContact', res.data)
            }
          })
      }
      rf.getRequest('EmergencyContactsRequest')
        .store({ data: this.user_contact })
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eContact', res.data)
          }
        })
    },
    clearData() {
      this.user_contact = this.emptyData(this.user_contact)
      this.isDisable = false
    },
    init() {
      this.user_contact = this.contact
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
