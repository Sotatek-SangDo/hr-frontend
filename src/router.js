import Vue from "vue";
import Router from "vue-router";
import auth from "./auth";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/views/Home.vue").default,
      beforeEnter: requireAuth
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      beforeEnter: checkLogin
    },
    {
      path: "/employees",
      name: "emp-list",
      component: () => import("@/views/Employee/EmployeeList.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/company",
      name: "com-contact",
      component: () => import("@/views/Company/CompanyContact.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/departments",
      name: "depar-list",
      component: () => import("@/views/Department/Departments.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/insurances",
      name: "insurances",
      component: () => import("@/views/Insurances/Insurances.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/insurance-payment",
      name: "insurance-payment",
      component: () => import("@/views/Insurances/InsurancePayment.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/insurance-payment-detail",
      name: "insurance-payment-detail",
      props: route => ({ id: route.query.id }),
      component: () => import("@/views/Insurances/IPDetail.vue"),
      beforeEnter: requireAuth
    }
  ]
});

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

function checkLogin(to, from, next) {
  if (auth.loggedIn()) {
    next({
      path: "/"
    });
  } else {
    next();
  }
}
