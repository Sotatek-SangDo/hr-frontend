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
      path: "/profile",
      name: "employee-profile",
      props: route => ({ id: route.query.id }),
      component: () => import("@/views/Employee/ProfileEmployee.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/employee",
      name: "employee-edit",
      props: route => ({ id: route.query.id }),
      component: () => import("@/views/Employee/EmployeeEdit.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/employee-add",
      name: "employee-add",
      component: () => import("@/views/Employee/AddEmployee.vue"),
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
    },
    {
      path: "/recruitment",
      name: "recruitment",
      component: () => import("@/views/Recruitment/Recruitment.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/recruitment-detail",
      name: "recruitment-detail",
      props: route => ({ id: route.query.id }),
      component: () => import("@/views/Recruitment/RecruitmentDetail.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/candidates",
      name: "candidates",
      component: () => import("@/views/Recruitment/Candidate.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/interviews",
      name: "interviews",
      component: () => import("@/views/Recruitment/Interview.vue"),
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
