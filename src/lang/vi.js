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
      add: 'Thêm mới',
      profile: 'Thông tin cá nhân',
      edit: 'Chỉnh sửa thông tin'
    },
    insurance: {
      index: 'Bảo hiểm',
      title: 'Bảo hiểm',
      payment: 'Thanh toán'
    },
    recruitment: {
      index: 'Tuyển dụng',
      candidate: 'Ứng viên',
      interview: 'Phỏng vấn'
    },
    contract: {
      index: 'Hợp đồng',
      list: 'Danh sách',
      add: 'Thêm mới',
      detail: 'Thông tin hợp đồng',
      edit: 'Chỉnh sửa thông tin'
    },
    salary: {
      index: 'Lương',
      list: 'Lương',
      add: 'Thêm mới',
      detail: 'Thông tin lương',
      edit: 'Chỉnh sửa thông tin lương',
      business: 'Kinh doanh',
      business_add: 'Thêm mới lương kinh doanh',
      business_edit: 'Chỉnh sửa lương kinh doanh',
      allowances: 'Trợ cấp',
      allowances_add: 'Thêm mới trợ cấp',
      allowances_edit: 'Chỉnh sửa trợ cấp'
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
      header: 'Danh sách nhân viên',
      gender: 'Giới tính'
    },
    insurance: {
      header: 'Bảo hiểm',
      num_social_security: 'Sổ BHXH',
      num_health_insurance: 'Thẻ BHYT',
      place_registration_medical: 'Nơi ĐKKCB',
      salary_paid: 'Mức lương đóng',
      started_at: 'Bắt đầu từ',
      status: 'Trạng thái',
      confirm_del: 'Bạn có chắc muốn xóa bảo hiểm này?'
    },
    ip: {
      header: 'Thanh toán bảo hiểm',
      name: 'Tên đợt thanh toán',
      time: 'Thời gian',
      reason_leave: 'Lý do nghỉ',
      num_day_leave: 'Số ngày nghỉ',
      insurance_money: 'Tiền bảo hiểm',
      amount: 'TỔng tiền',
      note: 'Ghi chú',
      confirm_del: 'Bạn có chắc muốn xóa thanh toán này?'
    },
    recruitment: {
      header: 'Đợt tuyển dụng',
      name: 'Tên đợt tuyển dụng',
      started_at: 'Bắt đầu từ',
      ended_at: 'Kết thúc',
      expired_at: 'Hạn nộp hồ sơ',
      num: 'Số lượng',
      status: 'Trạng thái'
    },
    candidate: {
      name: 'Tên ứng viên',
      gender: 'Giới tính',
      birthday: 'Ngày sinh',
      email: 'Email',
      phonenumber: 'Số điện thoại',
      status: 'Trạng thái'
    },
    contract: {
      contract_code: 'Số hợp đồng',
      employee: 'Nhân viên',
      search_name: 'Tên tìm kiếm...',
      header: 'Danh sách hồ sơ',
      start_date: 'Ngày bắt đầu',
      end_date: 'Ngày kết thúc',
      salary_basic: 'Lương cơ bản',
      salary_insurrance: 'Lương đóng BH',
      salary_insurrance_type: 'Loại BH',
      status: 'Trạng thái',
      contract_type: 'Loại hợp đồng',
      info: 'Thông tin hợp đồng',
      status_active: 'Đang có hiệu lực',
      status_inactive: 'Hết hiệu lực'
    },
    allowance: {
      info: 'Thông tin trợ cấp',
      header: 'Danh sách trợ cấp',
      search_name: 'Tên tìm kiếm...',
      employee: 'Nhân viên',
      allowance_type: 'Loại',
      subsidy: 'Số tiền',
      notes: 'Ghi chú',
      apply_date: 'Ngày áp dụng',
      status: 'Trạng thái'
    },
    salary: {
      header: 'Danh sách lương',
      info: 'Thông tin lương',
      employee_name: 'Nhân viên',
      salary_basic: 'Lương cơ bản',
      salary_insurance: 'Lương đóng bảo hiểm',
      salary_business: 'Lương kinh doanh',
      salary_notes: 'Ghi chú',
      search_name: 'Tên tìm kiếm...'
    },
    salary_business: {
      header: 'Danh sách lương kinh doanh',
      info: 'Thông tin kinh doanh',
      employee_name: 'Nhân viên',
      sales: 'Mặt hàng kinh doanh',
      amount: 'Số lượng',
      unit: 'Lương / Mặt hàng',
      search_name: 'Tên tìm kiếm...'
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
    },
    contract_add: {
      employee: 'Chọn nhân viên',
      contract_code: 'Số hợp đồng',
      start_date: 'Chọn ngày bắt đầu',
      end_date: 'Chọn ngày kết thúc',
      contract_type: 'Chọn loại hợp đồng',
      salary_insurrance: 'Lương đóng bảo hiểm',
      status: 'Trạng thái'
    },
    allowance_add: {
      employee: 'Nhân viên',
      allowance_type: 'Loại',
      subsidy: 'Số tiền',
      notes: 'Ghi chú',
      apply_date: 'Ngày áp dụng',
      status: 'Trạng thái'
    },
    salary_add: {
      employee_name: 'Nhân viên',
      salary_basic: 'Lương cơ bản',
      salary_insurance: 'Lương đóng bảo hiểm',
      salary_business: 'Lương kinh doanh',
      notes: 'Ghi chú'
    },
    salary_business_add: {
      employee_name: 'Nhân viên',
      sales: 'Mặt hàng kinh doanh',
      amount: 'Số lượng',
      unit: 'Lương / Mặt hàng'
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
  common: {
    no_data: 'Không có dữ liệu'
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
    work_email: 'Email công việc',
    department: 'Phòng ban',
    supervisor: 'Người gián sát trực tiếp',
    avatar: 'Ảnh đại diện',
    indirect_supervisor: 'Người gián sát gián tiếp',
    joinAt: 'Ngày gia nhập',
    confirmAt: 'Ngày xác nhận',
    edit: 'Thay đổi thông tin',
    id: 'Mã nhân viên',
    info: 'Thông tin cơ bản',
    skill: 'Kỹ năng',
    education: 'Học vấn',
    certification: 'Trình độ',
    certification_name: 'Trình độ chuyên môn'
  },
  contract: {
    add: 'Thêm mới',
    edit: 'Thay đổi thông tin',
    contract_code: 'Số hợp đồng',
    employee: 'Nhân viên',
    search_name: 'Tên tìm kiếm...',
    header: 'Danh sách hồ sơ',
    start_date: 'Ngày bắt đầu',
    end_date: 'Ngày kết thúc',
    salary_basic: 'Lương cơ bản',
    salary_insurrance: 'Lương đóng BH',
    status: 'Trạng thái HĐ',
    contract_type: 'Loại HĐ',
    info: 'Thông tin hợp đồng'
  },
  allowance: {
    edit: 'Thay đổi thông tin',
    employee: 'Nhân viên',
    allowance_type: 'Loại',
    subsidy: 'Số tiền',
    notes: 'Ghi chú',
    apply_date: 'Ngày áp dụng',
    status: 'Trạng thái'
  },
  salary: {
    edit: 'Thay đổi thông tin',
    employee_name: 'Nhân viên',
    salary_basic: 'Lương cơ bản',
    salary_insurance: 'Lương đóng bảo hiểm',
    salary_business: 'Lương kinh doanh',
    notes: 'Ghi chú'
  },
  salary_business: {
    edit: 'Thay đổi thông tin',
    employee_name: 'Nhân viên',
    sales: 'Mặt hàng kinh doanh',
    amount: 'Số lượng',
    unit: 'Lương / Mặt hàng'
  },
  validation: {
    employees: {
      name: 'Họ và tên',
      birthday: 'Ngày sinh',
      confirmed_at: 'Ngày xác nhận',
      joined_at: 'Ngày gia nhập',
      work_email: 'Email công việc',
      avatar: 'Ảnh đại diện'
    },
    contract: {
      contract_code: 'Số hợp đồng',
      employee_id: 'Nhân viên',
      start_date: 'Ngày bắt đầu',
      end_date: 'Ngày kết thúc',
      salary_basic: 'Lương cơ bản',
      salary_insurrance: 'Lương đóng BH',
      status: 'Trạng thái HĐ',
      contract_type_id: 'Loại HĐ'
    },
    required: 'bắt buộc không được rỗng'
  },
  skill: {
    title: 'Kỹ Năng',
    add_title: 'Thêm mới kỹ năng',
    update_title: 'Chỉnh sửả kỹ năng',
    detail: 'Thông tin chi tiết',
    select: 'Lựa chọn kỹ năng',
    detail_place: 'Thông tin chi tiết'
  },
  edu: {
    qualification_title: 'Trình độ chuyên môn',
    qualification_place: 'Lựa chọn trình độ chuyên môn',
    startedAt: 'Ngày bắt đầu',
    endedAt: 'Ngày hoàn thành',
    add_title: 'Thêm trình độ',
    update_title: 'Cập nhập trình độ',
    institute_title: 'Học viện',
    qualification_name: 'Trình độ chuyên môn',
    institute: 'Học viện'
  },
  cer: {
    add_title: 'Thêm chứng chỉ',
    update_title: 'Chỉnh sửa chứng chỉ',
    title: 'Chứng chỉ',
    select: 'Lựa chọn chứng chỉ',
    institute: 'Nơi học',
    institute_place: 'Nơi học',
    grantedOn: 'Ngày cấp',
    validTo: 'Ngày hết hạn'
  },
  lang: {
    add_title: 'Thêm mới kỹ năng',
    update_title: 'Chỉnh sửả kỹ năng',
    title: 'Ngôn Ngữ',
    select: 'Lựa chọn ngôn ngữ',
    read: 'Trình độ đọc',
    write: 'Trình độ viết',
    listen: 'Trình độ nghe',
    speak: 'Trình độ nói'
  },
  emergency_contact: {
    title: 'Danh bạ khẩn cấp',
    relation: 'Quan hệ',
    phone_number: 'Số điện thoại',
    add_title: 'Thêm danh bạ khẩn cấp',
    update_title: 'Chỉnh sửa danh bạ khẩn cấp',
    full_name: 'Họ và tên'
  },
  dependent: {
    title: 'Người phụ thuộc',
    add_title: 'Thêm người phụ thuộc',
    update_title: 'Chỉnh sửa',
    birthday: 'Ngày sinh',
    full_name: 'Họ và tên',
    relation: 'Quan hệ'
  },
  insurance: {
    add_title: 'Thêm mới bảo biểm',
    update_title: 'Chỉnh sửả bảo hiểm',
    employee: 'Nhân viên',
    emp_select: 'Lựa chọn nhân viên',
    status_select: 'Lựa chọn trạng thái',
    num_social_security: 'Số sổ BHXH',
    num_health_insurance: 'Số thẻ BHYT',
    place_registration_medical: 'Nơi ĐKKCB',
    salary_paid: 'Mức đóng',
    started_at: 'Ngày bắt đầu',
    status: {
      title: 'Trạng thái',
      st1: 'Đang tham gia',
      st2: 'Giảm tạm thời',
      st3: 'Giảm hẳn'
    }
  },
  ip: {
    title: 'Tên đợt thanh toán',
    add_title: 'Thêm mới đợt thanh toán bảo biểm',
    update_title: 'Chỉnh sửả đợt thanh toán bảo hiểm',
    time: 'Thời gian',
    detail_header: 'Danh sách thanh toán'
  },
  ip_model: {
    add_title: 'Thêm mới',
    update_title: 'Chỉnh sửa',
    name: 'Nhân viên',
    name_select: 'Lựa chọn nhân viên',
    payment: 'Đợt thanh toán',
    payment_select: 'Lựa chọn đợt thanh toán',
    num_social_security: 'Số sổ BHXH',
    reason_leave: 'Lý do',
    num_day_leave: 'Số ngày nghỉ',
    insurance_money: 'Tiền bảo hiểm',
    amount: 'Tổng tiền',
    notes: 'Ghi chú'
  },
  recruitment: {
    title: 'Tên đợt tuyển dụng',
    add_title: 'Thêm mới',
    update_title: 'Chỉnh sửa',
    status: {
      title: 'Trạng thái',
      st1: 'Đang triển khai',
      st2: 'Đã hoàn thành',
      select: 'Lựa chọn trạng thái'
    },
    info: 'Thông tin của đợt tuyển dụng',
    started_at: 'Ngày bắt đầu',
    ended_at: 'Ngày kết thúc',
    expired_at: 'Hạn nộp hồ sơ',
    num: 'Số lượng',
    detail_header: 'Danh sách ứng viên'
  },
  gender: {
    male: 'Nam',
    female: 'Nữ',
    orther: 'Khác'
  },
  candidate: {
    recruitment: 'Đợt tuyển dụng',
    recruitment_select: 'Lựa chọn đợt tuyển dụng',
    add_title: 'Thêm mới',
    update_title: 'Chỉnh sửa',
    gender: 'Giới tính',
    gender_select: 'Lựa chọn giới tính',
    birthday: 'Ngày sinh',
    name: 'Tên ứng viên',
    phone: 'Số điện thoại',
    job: 'Công việc',
    job_select: 'Lựa chọn công việc',
    note: 'Ghi chú',
    email: 'Email'
  },
  interview: {
    candidate: 'Ứng viên',
    candidate_select: 'Chọn ứng viên',
    update_title: 'Chỉnh sửa',
    add_title: 'Thêm mới',
    interviewer: 'Người phỏng vấn',
    interviewer_select: 'Chọn người phỏng vấn',
    started_at: 'Thời gian'
  },
  calendar: {
    confirm_update: 'Bạn có chắc muốn thay đổi?'
  },
  confirm: {
    del_skill: 'Bạn có chắc muốn xóa kỹ năng này'
  },
  button: {
    save: 'Lưu',
    update: 'Cập nhập'
  }
}
