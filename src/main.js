require("./config.js");
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "./config.js";
import EventBus from "./event-bus.js";
import "./script.js";

Vue.use(BootstrapVue);

window.config = config;


Vue.config.productionTip = false;

export const EventBus = new Vue({
  router : Router,
  store : store,
  render: h => h(App)
}).$mount("#app");

Vue.prototype.$eventBus = EventBus;