import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import auth from "./auth";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home, beforeEnter: requireAuth},
    { path: "/login", name: "login", component: Login, beforeEnter: checkLogin},
  ]
});

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function checkLogin (to, from, next) {
  if (auth.loggedIn()) {
    next({
      path: '/',
    })
  } else {
    next()
  }
}
