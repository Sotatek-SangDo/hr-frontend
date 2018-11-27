require("./config.js");
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "../src/config/config.js";
import "./script.js";

Vue.use(BootstrapVue);

window.config = config;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
