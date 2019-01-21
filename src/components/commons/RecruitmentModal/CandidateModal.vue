<template>
  <div class="modal fade show" id="candidate-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isCreate ? createTitle : updateTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 mt-12">
              <div class="card">
                <div class="card-body">
                  <form @submit.prevent="storeOrUpdate">
                    <div class="form-group">
                      <label for="detail-kni">Họ và tên</label>
                      <input type="text" v-model="candidate.name" class="form-control" placeholder="Họ và tên" />
                    </div>
                    <date-picker :title="birthday" v-model="candidate.birthday" :default="getDate(candidate.birthday)" v-if="delay"></date-picker>
                    <div class="form-group">
                      <label class="col-form-label">Giới tính</label>
                      <select v-model="candidate.gender" class="form-control">
                          <option value="">Lựa chọn giới tính</option>
                          <option v-for="(g, index) in gender"
                            :key="index"
                            :value="g"
                            v-text="g"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Số điện thoại</label>
                      <input type="text" v-model="candidate.phonenumber" class="form-control" placeholder="Số điện thoại" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Email</label>
                      <input type="email" v-model="candidate.email" class="form-control" placeholder="Email" />
                    </div>
                    <div class="form-group">
                      <label for="kni">Đợt tuyển dụng</label>
                      <select v-model="candidate.recruitment_id" class="form-control">
                        <option value="">Chọn đợt tuyển dụng</option>
                        <option v-for="(r, index) in recruitments"
                          :key="index"
                          :value="r.id"
                          v-text="r.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="kni">Công việc</label>
                      <select v-model="candidate.job_id" class="form-control">
                        <option value="">Chọn đợt tuyển dụng</option>
                        <option v-for="(j, index) in jobs"
                          :key="index"
                          :value="j.id"
                          v-text="j.title"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Ghi chú</label>
                      <textarea v-model="candidate.description" class="form-control"  />
                    </div>
                    <button type="submit" :disabled="isDisable" class="btn btn-primary mt-4 pr-4 pl-4">
                      <i class="ti-save"></i> {{ isCreate ? btnCreate : btnUpdate }}
                      </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rf from "../../../requests/RequestFactory";
import MasterView from "../../../views/MasterView";
import DatePicker from "../DatePicker";
import _ from "lodash";

export default {
  name: "CandidateModal",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      createTitle: "Thêm mới",
      updateTitle: "Chỉnh sửa",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      candidate: {
        job_id: "",
        email: "",
        name: "",
        gender: "",
        birthday: "",
        phonenumber: "",
        description: "",
        id: ""
      },
      gender: ["Nam", "Nữ", "Khác"],
      birthday: "Ngày sinh",
      isDisable: false,
      errors: [],
      modal_id: "candidate-modal",
      delay: false,
      recruitments: {},
      jobs: {}
    };
  },
  props: {
    propCandidate: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date();
    },
    getRecruitments() {
      rf.getRequest("RecruitmentRequest")
        .getAll()
        .then(res => (this.recruitments = res));
    },
    getJobs() {
      rf.getRequest("JobRequest")
        .getAll()
        .then(res => (this.jobs = res));
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    init() {
      this.candidate = this.propCandidate;
      this.getRecruitments();
      this.getJobs();
      this.delay = true;
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id", "description"];
      _.forEach(this.candidate, (val, key) => {
        let i = 0;
        if (!i) this.errors = [];
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        i++;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("CandidateRequest")
          .update({ data: this.candidate })
          .then(res => {
            if (res.status) {
              this.emitEvent("update-candidate", res.data);
            }
          });
      }
      rf.getRequest("CandidateRequest")
        .store({ data: this.candidate })
        .then(res => {
          if (res.status) {
            this.emitEvent("add-candidate", res.data);
          }
        });
    },
    clearData() {
      this.cadidate = this.emptyData(this.candidate);
      this.isDisable = false;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="sass" scoped>
</style>
