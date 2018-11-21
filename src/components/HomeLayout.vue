<template>
  <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{ headerTitle }}</span>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" id="search">
            <label class="mdl-textfield__label" for="search">Enter your query...</label>
          </div>
        </div>
      </div>
    </header>
    <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
      <header class="demo-drawer-header">
        <img src="images/user.jpg" class="demo-avatar">
        <div class="demo-avatar-dropdown">
          <span>hello@example.com</span>
          <div class="mdl-layout-spacer"></div>
          <button id="accbtn" @click="logout()">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </header>
      <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
        <span class="item-container">
          <router-link class="mdl-navigation__link mdl-mainmenu" to="/">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home
          </router-link><i class="material-icons arrow">arrow_right</i>
          <nav for="" class="demo-navigation mdl-subnavigation mdl-navigation mdl-color--blue-grey-800">
            <a class="mdl-navigation__link"><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>abc</a>
            <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
            <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
          </nav>
        </span>
        <a class="mdl-navigation__link" href="">
          <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home
        </a>
        <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a>
        <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>
        <div class="mdl-layout-spacer"></div>
      </nav>
    </div>
    <slot name="home_content"></slot>
  </div>
</template>

<script>
import auth from '../auth.js'
import $ from 'jquery'

export default {
  name: "home",
  components: {
  },
  props: {
    headerTitle: {
      type: String,
      default: 'Dashbroad'
    }
  },
  methods: {
    logout() {
      auth.logout()
    },
    init() {
      this.sleep(500).then(() => {
        const h  = $('#app').height();
        if (h && h <= 80) window.location.reload()
      })
    },
    sleep (milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
  },
  mounted () {
    this.init()
  }
};
</script>
