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
                  <el-form>
                    <div class="form-group">
                      <label>{{ $t('emergency_contact.full_name') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_contact.full_name" :placeholder="$t('emergency_contact.full_name')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('emergency_contact.relation') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_contact.relationship" :placeholder="$t('emergency_contact.relation')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('emergency_contact.phone_number') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_contact.contact_phone" :placeholder="$t('emergency_contact.phone_number')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
                    </div>
                    <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4" @click="storeOrUpdate">
                      <i class="ti-save"/>{{ isCreate ? btnCreate : btnUpdate }}
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
import _ from 'lodash'

export default {
  name: 'EmergencyContactModal',
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    contact: {
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
      createTitle: this.$t('emergency_contact.add_title'),
      updateTitle: this.$t('emergency_contact.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
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
          .update(this.user_contact)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eContact', res.data.data)
            }
          })
      }
      rf.getRequest('EmergencyContactsRequest')
        .store(this.user_contact)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eContact', res.data.data)
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
