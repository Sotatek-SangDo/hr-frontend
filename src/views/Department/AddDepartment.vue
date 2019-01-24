<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ title }}</h5>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-xs-6 col-md-6">
              <div class="form-group">
                <label for="fullname" class="col-form-label">Name</label>
                <input id="fullname" v-model="depart.name" class="form-control" type="text" autocomplete="off" placeholder="Name">
              </div>
              <div class="form-group">
                <label for="phone" class="col-form-label">Số điện thoại</label>
                <input id="phone" v-model="depart.phone_number" class="form-control" type="text" autocomplete="off" placeholder="Nhập vào số điện thoại ...">
              </div>
              <div class="form-group">
                <label for="private_email" class="col-form-label">Email</label>
                <input id="private_email" v-model="depart.email" class="form-control" type="private_email" autocomplete="off" placeholder="Nhập vào email cá nhân ...">
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group button">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit">Thêm mới</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MasterView from '../MasterView'
import rf from '../../requests/RequestFactory'
import _ from 'lodash'

export default {
  extends: MasterView,
  data() {
    return {
      title: 'Thêm mới phòng ban',
      depart: {
        name: '',
        email: '',
        phone_number: ''
      },
      isDisable: false,
      errors: []
    }
  },
  methods: {
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    submitForm() {
      this.isDisable = true
      this.errors = []
      const keyNullable = []
      _.forEach(this.depart, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) { this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` }) }
      })
      if (this.hasErrors()) {
        this.isDisable = false
        return
      }
      this.addDepartment()
    },
    addDepartment() {
      rf.getRequest('DepartmentRequest')
        .store(this.depart)
        .then(res => {
          if (res.status) {
            window.location.reload()
          } else {
            this.errors.push({ keys: 'Lỗi chưa xác định trên server' })
          }
        })
    }
  }
}
</script>
<style scoped lang="sass">
.one-line
  display: block
  width: 100%
.container
  h5
    text-align: center
    margin-bottom: 20px
  .input-group-addon
    padding: 8px 14px
    background-color: #eaedf0
    border-left: 1px solid #f3d9d9
    border-radius: 0 5px 5px 0
    font-size: 26px
.errors
  height: 40px;
  font-size: 20px;
  color: red;
button:disabled
  cursor: not-allowed;
.col-md-6
  margin: 0 auto !important;
.button
  text-align: center;
</style>
