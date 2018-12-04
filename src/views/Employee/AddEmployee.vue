<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ title }}</h5>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-xs-6 col-md-6">
              <div class="form-group">
                  <label for="fullname" class="col-form-label">Họ và tên</label>
                  <input class="form-control" type="text" v-model="emp.full_name" id="fullname" autocomplete="off" placeholder="Họ và tên">
              </div>
              <div class="form-group">
                <label class="col-form-label">Quốc Tịch</label>
                <select v-model="emp.nationality_id" class="form-control">
                    <option value="">Lựa chọn quốc tịch</option>
                    <option v-for="(national, index) in nationalities"
                      :key="index"
                      :value="national.id"
                      v-text="national.name"/>
                </select>
              </div>
              <date-picker :title="birthday" v-model="emp.birthday"></date-picker>
              <div class="form-group">
                <label class="col-form-label">Giới tính</label>
                <select v-model="emp.gender" class="form-control">
                    <option value="">Lựa chọn giới tính</option>
                    <option v-for="(g, index) in gender"
                      :key="index"
                      :value="g"
                      v-text="g"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Tình trạng hôn nhân</label>
                <select v-model="emp.marital_status" class="form-control">
                    <option value="">Tình trạng hôn nhân</option>
                    <option v-for="(ms, index) in maritalStatus"
                      :key="index"
                      :value="ms"
                      v-text="ms"/>
                </select>
              </div>
              <div class="form-group">
                  <label for="ethnicity" class="col-form-label">Dân tộc</label>
                  <input class="form-control" type="text" v-model="emp.ethnicity" id="ethnicity" autocomplete="off" placeholder="Nhập vào dân tộc ...">
              </div>
              <div class="form-group">
                  <label for="address" class="col-form-label">Địa chỉ</label>
                  <input class="form-control" type="text" v-model="emp.address" id="address" autocomplete="off" placeholder="Nhập vào địa chỉ ...">
              </div>
              <div class="form-group">
                <label class="col-form-label">Quốc gia</label>
                <select v-model="emp.country" class="form-control">
                    <option value="">Lựa chọn quốc gia</option>
                    <option v-for="(national, index) in nationalities"
                      :key="index"
                      :value="national.id"
                      v-text="national.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Loại nhân viên</label>
                <select v-model="emp.status" class="form-control">
                    <option value="">Lựa chọn loại nhân viên</option>
                    <option v-for="(s, index) in status"
                      :key="index"
                      :value="s.id"
                      v-text="s.status"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Công việc</label>
                <select v-model="emp.job" class="form-control">
                    <option value="">Lựa chọn công việc</option>
                    <option v-for="(j, index) in jobs"
                      :key="index"
                      :value="j.id"
                      v-text="j.title"/>
                </select>
              </div>
            </div>
            <div class="col-xs-6 col-md-6">
              <div class="input-group mb-3">
                <label class="col-form-label one-line">Ảnh</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="avatar" @change="onChooseAvatar">
                  <label class="custom-file-label" v-text="upload" for="avatar"/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Trả lương</label>
                <select v-model="emp.pay_grade" class="form-control">
                    <option value="">Lựa chọn trả lương</option>
                    <option v-for="(p, index) in payGrades"
                      :key="index"
                      :value="p.id"
                      v-text="p.title"/>
                </select>
              </div>
              <div class="form-group">
                  <label for="phone" class="col-form-label">Số điện thoại</label>
                  <input class="form-control" type="text" v-model="emp.phone" id="phone" autocomplete="off" placeholder="Nhập vào số điện thoại ...">
              </div>
              <div class="form-group">
                  <label for="private_email" class="col-form-label">Email cá nhân</label>
                  <input class="form-control" type="private_email" v-model="emp.private_email" id="private_email" autocomplete="off" placeholder="Nhập vào email cá nhân ...">
              </div>
              <div class="form-group">
                  <label for="email" class="col-form-label">Email công việc</label>
                  <input class="form-control" type="email" v-model="emp.email" id="email" autocomplete="off" placeholder="Nhập vào email công việc ...">
              </div>
              <date-picker :title="joinAt" v-model="emp.joined_at"></date-picker>
              <date-picker :title="confirmAt" v-model="emp.confirmed_at"></date-picker>
              <div class="form-group">
                <label class="col-form-label">Phòng ban</label>
                <select v-model="emp.department" class="form-control">
                    <option value="">Lựa chọn phòng ban</option>
                    <option v-for="(d, index) in departments"
                      :key="index"
                      :value="d.id"
                      v-text="d.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Người gián sát trực tiếp</label>
                <select v-model="emp.supervisor" class="form-control">
                    <option value="">Lựa chọn người giám sát trực tiếp</option>
                    <option v-for="(d, index) in supervisor"
                      :key="index"
                      :value="d.id"
                      v-text="d.name"/>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Người gián sát gián tiếp</label>
                <select v-model="emp.indirect_supervisor" class="form-control">
                    <option value="">Lựa chọn người giám sát gián tiếp</option>
                    <option v-for="(d, index) in supervisor"
                      :key="index"
                      :value="d.id"
                      v-text="d.name"/>
                </select>
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit">Thêm mới</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MasterView from "../MasterView";
import DatePicker from "../../components/commons/DatePicker";
import rf from "../../requests/RequestFactory";
import _ from "lodash";

export default {
  extends: MasterView,
  data() {
    return {
      title: "Thêm mới nhân viên",
      emp: {
        full_name: "",
        nationality_id: "",
        birthday: "",
        gender: "",
        marital_status: "",
        ethnicity: "",
        address: "",
        country: "",
        phone: "",
        private_email: "",
        email: "",
        joined_at: "",
        confirmed_at: "",
        department: "",
        supervisor: "",
        indirect_supervisor: "",
        status: "",
        job: "",
        pay_grade: ""
      },
      formData: "",
      upload: "Chọn ảnh",
      birthday: "Ngày Sinh",
      joinAt: "Ngày gia nhập",
      confirmAt: "Ngày xác nhận",
      nationalities: {},
      gender: ["Nam", "Nữ", "Khác"],
      supervisor: {},
      maritalStatus: ["Độc thân", "Đã kết hôn", "Li dị", "Khác"],
      departments: {},
      status: {},
      jobs: {},
      payGrades: {},
      isDisable: false,
      errors: []
    };
  },
  components: {
    DatePicker
  },
  methods: {
    onChooseAvatar(e) {
      this.upload = e.target.files[0].name;
      this.formData.append("file", e.target.files[0]);
    },
    getNationalities() {
      rf.getRequest("Nationality")
        .getAll()
        .then(res => {
          this.nationalities = res;
        });
    },
    getSupervisor() {
      rf.getRequest("EmployeeRequest")
        .getAll()
        .then(res => {
          this.supervisor = res;
        });
    },
    getEmployeeStatus() {
      rf.getRequest("EmployeeStatusRequest")
        .getAll()
        .then(res => {
          this.status = res;
        });
    },
    getJobs() {
      rf.getRequest("JobRequest")
        .getAll()
        .then(res => {
          this.jobs = res;
        });
    },
    getPayGrades() {
      rf.getRequest("PayGradeRequest")
        .getAll()
        .then(res => {
          this.payGrades = res;
        });
    },
    getDepartments() {
      rf.getRequest("DepartmentRequest").getAll().then(res => {
        this.departments = res;
      });
    },
    initial() {
      this.getNationalities();
      this.getSupervisor();
      this.getEmployeeStatus();
      this.getJobs();
      this.getPayGrades();
      this.getDepartments();
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    submitForm() {
      this.isDisable = true;
      this.errors = [];
      const keyNullable = ["indirect_supervisor", "supervisor"];
      _.forEach(this.emp, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
      });
      if (this.hasErrors()) {
        this.isDisable = false;
        return;
      }
      this.addEmployee();
    },
    addEmployee() {
      _.forEach(this.emp, (emp, i) => {
        this.formData.append(`${i}`, emp);
      });
      rf.getRequest("EmployeeRequest")
        .store(this.formData)
        .then(res => {
          if (res.status) {
            window.location.reload();
          } else {
            this.errors.push({ keys: "Lỗi chưa xác định trên server" });
          }
        });
    }
  },
  mounted() {
    this.formData = new FormData();
    this.initial();
  }
};
</script>
<style scoped lang="sass">
.one-line
  display: block
  width: 100%
.container
  h5
    text-align: center
    margin-bottom: 20px
  .input-group-addon
    padding: 8px 14px
    background-color: #eaedf0
    border-left: 1px solid #f3d9d9
    border-radius: 0 5px 5px 0
    font-size: 26px
.errors
  height: 40px;
  font-size: 20px;
  color: red;
button:disabled
  cursor: not-allowed;
</style>
