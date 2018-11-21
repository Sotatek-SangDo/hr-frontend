<template>
  <div class="mdl-layout mdl-js-layout">
    <div id="login-conatiner" class="mdl-card mdl-shadow--16dp">
      <div class="mdl-card__supporting-text">
        <div id="login-fab" class="mdl-color--accent mdl-color-text--white">
          <i id="lock-icon" class="material-icons">lock</i><span>Đăng nhập</span>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" id="email" v-model="params.email" autofocus autocomplete="off" />
            <label class="mdl-textfield__label" for="email">Tài khoản</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" :class="passError || !validatePass ? 'is-invalid' : ''">
            <input class="mdl-textfield__input" type="password" id="password" @keyup="checkAndSubmit" @focus="onPassFocus()" v-model="params.password" placeholder="Mật khẩu"/>
        </div>
        <div class="error" v-if="passError || !validatePass">
          <i class="material-icons">error_outline</i>
          <span class="mess">{{ passError || 'Mật khẩu ít nhất 6 kí tự' }}</span>
        </div>
        <div v-else/>
        <button id="login-button" :disable="isDisable()" @click="login()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white">
          Đăng Nhập
        </button>
      </div>
    </div>
    </div>
</template>

<script>
  import rf from '../requests/RequestFactory';
  import $ from 'jquery'
  import auth from '../auth'

    export default {
      data() {
        return {
          params: {
            email: '',
            password: '',
          },
          passError: '',
          validatePass: true,
        };
      },
      watch: {
        'params.password': function(newVal) {
          if(!newVal) return;
          this.validatePass = newVal.length >= 6;
        },
      },
      methods: {
        isDisable() {
          return this.validatePass;
        },
        login() {
          auth.login(this.params, res => {
            if (!res.authenticated) {
              this.passError = res.error
            } else {
              this.$router.replace(this.$route.query.redirect || '/')
            }
          })
        },
        onPassFocus() {
          if (this.params.password.length < 6) {
            this.validatePass = false;
          }
        },
        init() {
          this.setPosition();
          $(window).resize(() => this.setPosition());
        },
        setPosition() {
          const ele = $('#login-conatiner');
          const screenHeight = $(window).height();
          const screenWidth = $(window).width();
          ele.css({top: (screenHeight - ele.width())/2, left: (screenWidth - ele.height())/2 });
        },
        checkAndSubmit(e) {
          if (e.keyCode === 13) {
            !this.isDisable() || this.login()
          }
        }
      },
      mounted() {
        this.init()
      }
    }
</script>
