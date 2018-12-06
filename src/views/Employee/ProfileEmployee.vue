<template>
  <div>
    <div class="profile-body" v-show="isProfile">
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
                <i class="fa fa-phone"></i> <span id="mobile_phone">&nbsp; +84{{ scopeEmp.phone }}</span>&nbsp;&nbsp;
                <i class="fa fa-envelope"></i> <span id="work_email">&nbsp; {{ scopeEmp.work_email }}</span>
              </p>
            </div>
          </div>
          <div class="row-fluid">
            <div class="col-xs-12" style="font-size:18px;border-bottom: 1px solid #DDD;margin-bottom: 10px;padding-bottom: 10px;">
              <button @click="editProfile" class="btn btn-small btn-success" style="margin-right:10px;"><i class="fa fa-edit"></i> Thay đổi thông tin</button>
            </div>
          </div>
        </div>
      </div>
      <tab-slide :tabs="tabs">
        <div role="tabpanel" class="tab-pane fade active in show" id="ttcb">
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
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Quốc tịch:</b></span><br/>
                              <span class="info">{{ scopeEmp.nationality.name }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Mã nhân viên:</b></span><br/>
                              <span class="info">{{ scopeEmp.id }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Giới tính:</b></span><br/>
                              <span class="info">{{ scopeEmp.gender }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Tình trạng hôn nhân:</b></span><br/>
                              <span class="info">{{ scopeEmp.marital_status }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Ngày Sinh:</b></span><br/>
                              <span class="info">{{ scopeEmp.birthday | date }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Ngày Gia nhập:</b></span><br/>
                              <span class="info">{{ scopeEmp.joined_at | date }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Email cá nhân:</b></span><br/>
                              <span class="info">{{ scopeEmp.private_email }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Dân tộc:</b></span><br/>
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
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Địa chỉ: </b></span><br/>
                              <span class="info">{{ scopeEmp.address }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Quốc gia:</b></span><br/>
                              <span class="info">{{ scopeEmp.nationality.name }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Email: </b></span><br/>
                              <span class="info">{{ scopeEmp.private_email }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Email công việc:</b></span><br/>
                              <span class="info">{{ scopeEmp.work_email }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Số điện thoại: </b></span><br/>
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
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Chức danh: </b></span><br/>
                              <span class="info">{{ scopeEmp.pay_grade.title }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Phòng:</b></span><br/>
                              <span class="info">{{ scopeEmp.department_id }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Công việc: </b></span><br/>
                              <span class="info">{{ scopeEmp.job.title }}</span>
                            </p>
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Tình trạng việc làm: </b></span><br/>
                              <span class="info">{{ scopeEmp.employee_status.status }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Giám sát trực tiếp:</b></span><br/>
                              <span class="info">{{ scopeEmp.supervisor_name }}</span>
                            </p>
                          </div>
                          <div class="col-lg-3 col-md-6">
                            <p>
                              <i class="ti-info"></i>&nbsp;
                              <span><b>Giám sát gián tiếp: </b></span><br/>
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
        <div role="tabpanel" class="tab-pane fade" id="tdcm">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 col-md-6">
                    <add-skills :emp-id="scopeEmp.id"></add-skills>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-educations :emp-id="scopeEmp.id"></add-educations>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-certifications :emp-id="scopeEmp.id"></add-certifications>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <add-languages :emp-id="scopeEmp.id"></add-languages>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane fade" id="gd">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 col-md-6">
                    <add-family :emp-id="scopeEmp.id"></add-family>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane fade" id="tl">
          <div class="col-12 mt-5">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <add-documents :emp-id="scopeEmp.id"></add-documents>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-slide>
    </div>
    <div v-if="isEdit">
      <add-employee :header="header" :employee="emp"></add-employee>
    </div>
  </div>
</template>

<script>
import TabSlide from "../../components/TabSlide";
import AddSkills from "../../components/employee/AddSkills";
import AddFamily from "../../components/employee/AddFamily";
import AddDocuments from "../../components/employee/AddDocuments";
import AddEducations from "../../components/employee/AddEducations";
import AddLanguages from "../../components/employee/AddLanguages";
import AddCertifications from "../../components/employee/AddCertifications";
import AddEmployee from "./AddEmployee.vue";

export default {
  name: "ProfileEmployee",
  components: {
    TabSlide,
    AddSkills,
    AddEmployee,
    AddFamily,
    AddDocuments,
    AddEducations,
    AddLanguages,
    AddCertifications
  },
  props: {
    employee: {
      type: Object
    }
  },
  data() {
    return {
      tabs: [
        { title: "Thông tin cơ bản", href: "ttcb" },
        { title: "Trình độ chuyên môn", href: "tdcm" },
        { title: "Gia đình", href: "gd" },
        { title: "Tài liệu", href: "tl" }
      ],
      isProfile: true,
      isEdit: false,
      header: "Thông tin nhân viên",
      emp: {
        id: "",
        full_name: this.employee.name,
        nationality_id: this.employee.nationality_id,
        birthday: this.employee.birthday,
        gender: this.employee.gender,
        marital_status: this.employee.marital_status,
        ethnicity: this.employee.ethnicity,
        address: this.employee.address,
        country: this.employee.country,
        phone: this.employee.phone,
        private_email: this.employee.private_email,
        email: this.employee.work_email,
        joined_at: this.employee.joined_at,
        confirmed_at: this.employee.confirmed_at,
        department: this.employee.department_id,
        supervisor: this.employee.supervisor_id,
        indirect_supervisor: this.employee.indirect_supervisor
          ? this.employee.indirect_supervisor
          : "",
        status: this.employee.status,
        job: this.employee.job_id,
        pay_grade: this.employee.paygrade_id
      }
    };
  },
  computed: {
    scopeEmp() {
      return this.employee;
    }
  },
  methods: {
    editProfile() {
      this.isProfile = false;
      this.isEdit = true;
    }
  },
  mounted() {
    if (this.employee.id) {
      this.emp.id = this.employee.id;
    }
  }
};
</script>
<style lang="sass">
.profile
  &.card
    padding: 20px 0
.row
  .info
    margin: 0
    padding: 0
    padding-left: 20px
</style>
