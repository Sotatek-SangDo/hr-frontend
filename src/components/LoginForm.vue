<template>
  <div class="container">
    <div class="login-box ptb--100">
      <form @submit.prevent="login">
        <div class="login-form-head">
          <h4>Đăng nhập</h4>
          <p>Hãy đăng nhập và bắt đầu với việc quản lý trong hệ thống Admin</p>
        </div>
        <div class="login-form-body">
          <div class="form-gp">
            <input v-model="params.email" type="email" placeholder="Tai khoan" autofocus autocomplete="off" required>
            <i class="ti-email"/>
          </div>
          <div :class="passError || !validatePass ? 'is-invalid' : ''" class="form-gp">
            <input v-model="params.password" type="password" placeholder="Mat Khau" required>
            <i class="ti-lock"/>
          </div>
          <div v-if="passError || !validatePass" class="error">
            <i class="material-icons">error_outline</i>
            <span class="mess">{{ passError || 'Mật khẩu ít nhất 6 kí tự' }}</span>
          </div>
          <div v-if="hasErrorRequest('request_auth')" class="error">
            <i class="material-icons">error_outline</i>
            <span class="mess">{{ errors['request_auth'] }}</span>
          </div>
          <div class="submit-btn-area">
            <button id="form_submit" :disable="isDisable()">Đăng Nhập <i class="ti-arrow-right"/></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import rf from '../requests/RequestFactory'
import MasterView from '../views/MasterView'

export default {
  name: 'LoginForm',
  extends: MasterView,
  data() {
    return {
      params: {
        email: '',
        password: ''
      },
      passError: '',
      validatePass: true,
      errors: []
    }
  },
  watch: {
    'params.password': function(newVal) {
      if (!newVal) return
      this.validatePass = newVal.length >= 6
    }
  },
  mounted() {
    // this.init();
    this.onErrorRequest()
  },
  methods: {
    isDisable() {
      return this.validatePass
    },
    login() {
      auth.login(this.params, res => {
        if (!res.authenticated) {
          this.passError = res.error
        } else {
          rf.getRequest('UserRequest')
            .authenticate()
            .then(res => {
              localStorage.setItem('user', JSON.stringify(res))
              this.$router.replace(this.$route.query.redirect || '/')
            })
        }
      })
    },
    onPassFocus() {
      if (this.params.password.length < 6) {
        this.validatePass = false
      }
    },
    init() {},
    checkAndSubmit(e) {
      if (e.keyCode === 13) {
        !this.isDisable() || this.login()
      }
    }
  }
}
</script>
<style scoped lang="sass">
h4
  color: #1c7cbd
  font-size: 2rem
  font-family: Averta-Bold
p
  color: #1c7cbd
  font-size: 14px
#form_submit
  font-family: Averta-ExtraBold
  font-size: 22px
  height: 65px
  i
    font-weight: 900
</style>
