export default {
  route: {
    dashboard: 'Trang quản lý',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    employee: {
      index: 'Nhân viên',
      list: 'Danh sách',
      add: 'Thêm mới'
    }
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Tìm kiếm',
    add: 'Thêm',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Thao tác',
    edit: 'Sửa',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Xóa',
    cancel: 'Cancel',
    confirm: 'Lưu',
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    email: 'Email',
    action: 'Thao tác',
    birthday: 'Ngày sinh',
    address: 'Địa chỉ',
    department: {
      name: 'Phòng ban',
      email: 'Email công việc'
    },
    employee: {
      private_email: 'Email cá nhân',
      job: 'Công việc',
      name: 'Họ và tên',
      search_name: 'Tên tìm kiếm...',
      header: 'Danh sách nhân viên'
    }
  },
  placeholder: {
    email: 'Nhập vào email ...',
    phone: 'Nhập số điện thoại',
    employee_add: {
      name: 'Nhập tên của nhân viên...',
      nationality: 'Chọn quốc tịch...',
      gender: 'Chọn giới tính...',
      marital: 'Chọn tình trạng hôn nhân',
      ethnicity: 'Dân tộc...',
      address: 'Nhập địa chỉ...',
      country: 'Chọn quốc gia...',
      status: 'Chọn loại nhân viên',
      job: 'Chọn công việc',
      paygrade: 'Lựa chọn trả lương',
      department: 'Lựa chọn phòng ban',
      avatar: 'Chọn ảnh ...',
      supervisor: 'Chọn người giám sát trực tiếp',
      indirect_supervisor: 'Lựa chọn người giám sát gián tiếp',
      date: 'Chọn một ngày...'
    }
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  language: {
    vi: 'Tiếng Việt',
    en: 'Tiếng Anh'
  },
  employee: {
    add: 'Thêm mới',
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    ethnicity: 'Dân tộc',
    address: 'Địa chỉ',
    nationality: 'Quốc tịch',
    gender: 'Giới tính',
    birthday: 'Ngày sinh',
    marital: 'Tình trạng hôn nhân',
    country: 'Quốc gia',
    status: 'Loại nhân viên',
    job: 'Công việc',
    paygrade: 'Trả lương',
    private_email: 'Email cá nhân',
    email_work: 'Email công việc',
    department: 'Phòng ban',
    supervisor: 'Người gián sát trực tiếp',
    avatar: 'Ảnh đại diện',
    indirect_supervisor: 'Người gián sát gián tiếp',
    joinAt: 'Ngày gia nhập',
    confirmAt: 'Ngày xác nhận'
  },
  validation: {
    fields: {
      full_name: 'Họ và tên',
      birthday: 'Ngày sinh',
      confirmed_at: 'Ngày xác nhận',
      joined_at: 'Ngày gia nhập'
    },
    required: 'bắt buộc không được rỗng'
  }
}
