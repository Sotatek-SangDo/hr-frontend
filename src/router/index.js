import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const mapServerRouters = {
  syncEmployee: {
    component: () => import('@/views/layout/Layout'),
    path: '/employee',
    redirect: '/Employee/EmployeeList',
    meta: {
      title: 'employee.index',
      icon: 'user'
    }
  },
  childSyncEmployee: {
    component: () => import('@/views/Employee/EmployeeList'),
    path: 'index',
    name: 'Employee',
    meta: { title: 'employee.list', icon: 'user', noCache: true }
  },
  childSyncEmployeeAdd: {
    component: () => import('@/views/Employee/AddEmployee'),
    path: 'add',
    name: 'Add Employee',
    meta: { title: 'employee.add', icon: 'new-user', noCache: true }
  },
  childSyncEmployee2: {
    component: () => import('@/views/Employee/EmployeeList'),
    path: 'index2',
    name: 'Employee 2',
    meta: { title: 'Employee 2', icon: 'user', noCache: true }
  },
  addEmployee: {
    component: () => import('@/views/Employee/AddEmployee'),
    path: 'addemployee',
    name: 'EmployeeAdd',
    meta: { title: 'employee.add', icon: 'plus-square' }
  },
  employeeProfile: {
    component: () => import('@/views/Employee/ProfileEmployee'),
    path: 'profile/:id',
    name: 'EmployeeProfile',
    meta: { title: 'employee.profile' },
    hidden: true
  },
  employeeEdit: {
    component: () => import('@/views/Employee/AddEmployee'),
    path: 'eidit/:id',
    name: 'EmployeeEdit',
    meta: { title: 'employee.edit' },
    hidden: true
  },
  syncInsurance: {
    component: () => import('@/views/layout/Layout'),
    path: '/insurance',
    redirect: '/Insurances/InsurancesIndex',
    meta: {
      title: 'insurance.index',
      icon: 'insurance'
    }
  },
  insuranceIndex: {
    component: () => import('@/views/Insurances/Insurances'),
    path: 'list',
    name: 'Insurances',
    meta: { title: 'insurance.title', icon: 'user' }
  },
  insurancePayment: {
    component: () => import('@/views/Insurances/InsurancePayment'),
    path: 'payment',
    name: 'InsurancePayment',
    meta: { title: 'insurance.payment', icon: 'payment' }
  },
  ipDetail: {
    component: () => import('@/views/Insurances/IPDetail'),
    path: 'payment/:id',
    name: 'IPDetail',
    meta: { title: 'insurance.payment' },
    hidden: true
  },
  syncRecruitment: {
    component: () => import('@/views/layout/Layout'),
    path: '/recruitment',
    redirect: '/Recruitment/RecruitmentIndex',
    meta: {
      title: 'recruitment.index',
      icon: 'recruitment'
    }
  },
  recruitmentIndex: {
    component: () => import('@/views/Recruitment/Recruitment'),
    path: 'index',
    name: 'Recruitment',
    meta: { title: 'recruitment.index', icon: 'recruitment' }
  },
  recruitmentDetail: {
    component: () => import('@/views/Recruitment/RecruitmentDetail'),
    path: 'detail/:id',
    name: 'RecruitmentDetail',
    meta: { title: 'recruitment.index', icon: 'recruitment' },
    hidden: true
  },
  candidate: {
    component: () => import('@/views/Recruitment/Candidate'),
    path: 'candidate',
    name: 'Candidate',
    meta: { title: 'recruitment.candidate', icon: 'user' }
  },
  interviewCalendar: {
    component: () => import('@/views/Recruitment/Interview'),
    path: 'interview',
    name: 'Interview',
    meta: { title: 'recruitment.interview', icon: 'interview' }
  },
  syncContract: {
    component: () => import('@/views/layout/Layout'),
    path: '/contract',
    redirect: '/Contract/ContractList',
    meta: { title: 'contract.index', icon: 'contract' }
  },
  childSyncContract: {
    component: () => import('@/views/Contract/ContractList'),
    path: 'index',
    name: 'Contract',
    meta: { title: 'contract.list', icon: 'user', noCache: true }
  },
  addContract: {
    component: () => import('@/views/Contract/AddContract'),
    path: 'addcontract',
    name: 'ContractAdd',
    meta: { title: 'contract.add', icon: 'plus-square' }
  },
  contractDetail: {
    component: () => import('@/views/Contract/DetailContract'),
    path: 'detail/:id',
    name: 'ContractDetail',
    meta: { title: 'contract.detail' },
    hidden: true
  },
  contractEdit: {
    component: () => import('@/views/Contract/AddContract'),
    path: 'edit/:id',
    name: 'ContractEdit',
    meta: { title: 'contract.edit' },
    hidden: true
  }
}

export const developerRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    meta: { title: 'PDF', icon: 'pdf' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/department',
    component: Layout,
    // redirect: '/department/index',
    name: 'Departments',
    meta: {
      title: 'Department',
      icon: 'department'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/Department/index'),
        name: 'DepartmentsIndex',
        meta: { title: 'Department', icon: 'department' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
