<template>
  <div>
    <div id="loading">
      <div class="loader"></div>
    </div>
    <div class="login-area login-s2">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import $ from "jquery";

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      email: "",
      pass: "",
      error: false
    };
  },
  methods: {
    init() {
      const preloader = $("#loading");
      $(window).on("load", function() {
        preloader.fadeOut(3000, "linear", function() {
          $(this).remove();
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.login-area {
  background-image: url(/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  &.login-s2 {
    &:before {
      background: rgba(255, 255, 255, 0.8);
    }
    ::placeholder {
      color: #000;
      font-size: 18px;
    }
  }
}
input {
  font-family: Averta;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom-color: #2c71da !important;
  height: 40px !important;
}
.form-gp {
  i {
    color: #000 !important;
    font-size: 26px;
    top: 5px;
  }
}
#loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
}
.error {
  color: red;
  i {
    display: none;
  }
}
a {
  text-decoration: none;
}
input {
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }
}
.mdl-color--accent {
  padding: 20px 0;
  margin-bottom: 20px;
  i {
    font-size: 30px;
    margin: 0 10px;
  }
  span {
    font-size: 28px;
    display: inline-block;
    vertical-align: top;
    padding-top: 6px;
  }
}
.error {
  margin-bottom: 15px;
  .mess {
    color: red;
    display: inline-block;
    vertical-align: top;
    padding-top: 4px;
  }
  i {
    color: red;
  }
}
</style>
