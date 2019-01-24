<template>
  <div>
    <div v-if="show" class="profile-body">
      <div class="row">
        <div class="col-xs-12 col-md-2">
          <div class="row-fluid">
            <div class="col-xs-12" style="text-align: center;">
              <img id="profile_image_1" :src="scopeEmp.avatar" class="img-polaroid img-thumbnail" style="max-width: 140px;max-height: 140px;">
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-10">
          <div class="row-fluid">
            <div class="col-md-12"><h2 id="name">{{ scopeEmp.name }}</h2></div>
          </div>
          <div class="row-fluid">
            <div class="col-md-12">
              <p>
                <i class="fa fa-phone"/> <span id="mobile_phone">&nbsp; +84{{ scopeEmp.phone }}</span>&nbsp;&nbsp;
                <i class="fa fa-envelope"/> <span id="work_email">&nbsp; {{ scopeEmp.work_email }}</span>
              </p>
            </div>
          </div>
          <div class="row-fluid">
            <div class="col-xs-12" style="font-size:18px;border-bottom: 1px solid #DDD;margin-bottom: 10px;padding-bottom: 10px;">
              <button class="btn btn-small btn-success" style="margin-right:10px;" @click="editProfile(scopeEmp.id)">
                <i class="fa fa-edit"/> Thay đổi thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
      <tab-slide :tabs="tabs">
        <div id="ttcb" role="tabpanel" class="tab-pane fade active in show">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div id="accordion3" class="according accordion-s3">
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#accordion11">
                        Thông tin cá nhân
                      </a>
                    </div>
                    <div id="accordion11" class="collapse show" data-parent="#accordion3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Quốc tịch:</b></span><br>
                              <span class="info">{{ scopeEmp.nationality.name }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Mã nhân viên:</b></span><br>
                              <span class="info">{{ scopeEmp.id }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Giới tính:</b></span><br>
                              <span class="info">{{ scopeEmp.gender }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Tình trạng hôn nhân:</b></span><br>
                              <span class="info">{{ scopeEmp.marital_status }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Ngày Sinh:</b></span><br>
                              <span class="info">{{ scopeEmp.birthday | date }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Ngày Gia nhập:</b></span><br>
                              <span class="info">{{ scopeEmp.joined_at | date }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Email cá nhân:</b></span><br>
                              <span class="info">{{ scopeEmp.private_email }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Dân tộc:</b></span><br>
                              <span class="info">{{ scopeEmp.ethnicity }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#accordion12">
                        Thông tin liên lạc
                      </a>
                    </div>
                    <div id="accordion12" class="collapse" data-parent="#accordion3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Địa chỉ: </b></span><br>
                              <span class="info">{{ scopeEmp.address }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Quốc gia:</b></span><br>
                              <span class="info">{{ scopeEmp.nationality.name }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Email: </b></span><br>
                              <span class="info">{{ scopeEmp.private_email }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Email công việc:</b></span><br>
                              <span class="info">{{ scopeEmp.work_email }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Số điện thoại: </b></span><br>
                              <span class="info">{{ scopeEmp.phone }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#accordion13">
                        Thông tin công việc
                      </a>
                    </div>
                    <div id="accordion13" class="collapse" data-parent="#accordion3">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Chức danh: </b></span><br>
                              <span class="info">{{ scopeEmp.pay_grade.title }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Phòng:</b></span><br>
                              <span class="info">{{ scopeEmp.department_id }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Công việc: </b></span><br>
                              <span class="info">{{ scopeEmp.job.title }}</span>
                            </p>
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Tình trạng việc làm: </b></span><br>
                              <span class="info">{{ scopeEmp.employee_status.status }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Giám sát trực tiếp:</b></span><br>
                              <span class="info">{{ scopeEmp.supervisor_name }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"/>&nbsp;
                              <span><b>Giám sát gián tiếp: </b></span><br>
                              <span class="info">{{ scopeEmp.indirect_supervisor_name }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tdcm" role="tabpanel" class="tab-pane fade">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 col-md-6">
                    <add-skills :emp-id="scopeEmp.id"/>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-educations :emp-id="scopeEmp.id"/>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-certifications :emp-id="scopeEmp.id"/>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-languages :emp-id="scopeEmp.id"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="gd" role="tabpanel" class="tab-pane fade">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <add-emergency-contacts :emp-id="scopeEmp.id"/>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <add-dependents :emp-id="scopeEmp.id"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tl" role="tabpanel" class="tab-pane fade">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <add-documents :emp-id="scopeEmp.id"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-slide>
    </div>
  </div>
</template>

<script>
import TabSlide from '../TabSlide'
import AddSkills from './AddSkills'
import AddEmergencyContacts from './AddEmergencyContacts'
import AddDocuments from './AddDocuments'
import AddEducations from './AddEducations'
import AddLanguages from './AddLanguages'
import AddDependents from './AddDependents'
import AddCertifications from './AddCertifications'
import rf from '../../requests/RequestFactory'

export default {
  name: 'EProfile',
  components: {
    TabSlide,
    AddSkills,
    AddEmergencyContacts,
    AddDocuments,
    AddEducations,
    AddLanguages,
    AddDependents,
    AddCertifications
  },
  props: {
    id: {
      type: String || Number,
      default: ''
    }
  },
  data() {
    return {
      tabs: [
        { title: 'Thông tin cơ bản', href: 'ttcb' },
        { title: 'Trình độ chuyên môn', href: 'tdcm' },
        { title: 'Gia đình', href: 'gd' },
        { title: 'Tài liệu', href: 'tl' }
      ],
      header: 'Thông tin nhân viên',
      show: false,
      emp: {
        id: '',
        full_name: '',
        nationality_id: '',
        birthday: '',
        gender: '',
        marital_status: '',
        ethnicity: '',
        address: '',
        country: '',
        phone: '',
        private_email: '',
        email: '',
        joined_at: '',
        confirmed_at: '',
        department: '',
        supervisor: '',
        indirect_supervisor: '',
        status: '',
        job: '',
        pay_grade: ''
      },
      scopeEmp: {}
    }
  },
  created() {
    this.getEmployee()
  },
  methods: {
    editProfile(empId) {
      this.$router.push({
        name: 'employee-edit',
        query: { id: empId }
      })
    },
    getEmployee() {
      rf.getRequest('EmployeeRequest')
        .getEmployee({ id: this.id })
        .then(res => {
          this.scopeEmp = res
          this.setEmp()
        })
    },
    setEmp() {
      this.emp.id = this.scopeEmp.id
      this.emp.full_name = this.scopeEmp.name
      this.emp.nationality_id = this.scopeEmp.nationality_id
      this.emp.birthday = this.scopeEmp.birthday
      this.emp.gender = this.scopeEmp.gender
      this.emp.marital_status = this.scopeEmp.marital_status
      this.emp.ethnicity = this.scopeEmp.ethnicity
      this.emp.address = this.scopeEmp.address
      this.emp.country = this.scopeEmp.country
      this.emp.phone = this.scopeEmp.phone
      this.emp.private_email = this.scopeEmp.private_email
      this.emp.email = this.scopeEmp.work_email
      this.emp.joined_at = this.scopeEmp.joined_at
      this.emp.confirmed_at = this.scopeEmp.confirmed_at
      this.emp.department = this.scopeEmp.department_id
      this.emp.supervisor = this.scopeEmp.supervisor_id
      this.emp.indirect_supervisor = this.scopeEmp.indirect_supervisor
        ? this.scopeEmp.indirect_supervisor
        : ''
      this.emp.status = this.scopeEmp.status
      this.emp.job = this.scopeEmp.job_id
      this.emp.pay_grade = this.scopeEmp.paygrade_id
      this.show = true
    }
  }
}
</script>

<style lang="sass" scoped>
.profile-body
  max-width: 100%;
</style>
