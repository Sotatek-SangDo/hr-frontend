<template>
  <div class="container">
    <div class="mdl-layout__container">
        <div class="demo-layout-transparent mdl-layout mdl-js-layout is-upgraded" data-upgraded=",MaterialLayout">
            <header class="mdl-layout__header mdl-layout__header--transparent is-casting-shadow">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">
                        <a class="navbar-brand" href="/">
                            HRMS
                        </a>
                    </span>
                    <div class="mdl-layout-spacer">
                    </div>
                </div>
            </header>
        </div>
    </div>
    <main class="py-4">
        <div class="mdl-layout__container">
            <login-form></login-form>
        </div>
    </main>
  </div>
</template>

<script>
  import LoginForm from '../components/LoginForm.vue'

  export default {
    components: {
        LoginForm,
    },
    data () {
      return {
        email: '',
        pass: '',
        error: false
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
.error {
  color: red;
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
    .mess{
        color: red;
        display: inline-block;
        vertical-align: top;
        padding-top: 4px;
    }
    i{
        color: red;
    }
}
.demo-layout-transparent {
    background: url('../../public/images/bg.jpg') center / cover;
}
.demo-layout-transparent .mdl-layout__header,
.demo-layout-transparent .mdl-layout__drawer-button {
    color: white;
}
</style>
