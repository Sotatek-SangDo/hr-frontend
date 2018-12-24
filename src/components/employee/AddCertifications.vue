<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-certification">
          <span class="icon"><i class="ti-plus"></i></span>Education
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userCertifications">
          <div class="list-group-item sub-tab-item" v-for="(cer, i) in userCertifications" :key="i">
            <h5 class="list-group-item-heading">{{ cer.name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="remove(cer)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(cer)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Granted On: {{ cer.granted_on }}</p>
            <p class="list-group-item-text">Valid To: {{ cer.valid_to }}</p>
            <p class="list-group-item-text">Institute: {{ cer.institute }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade show" ref="add_modal" id="add-certification">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới học vấn</h5>
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mt-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit.prevent="store">
                      <div class="form-group">
                        <label for="kni">Certification</label>
                        <select v-model="user_certifications.certification_id" id="kni" class="form-control">
                          <option value="">Lựa chọn Certifications</option>
                          <option v-for="(cer, index) in certifications"
                            :key="index"
                            :value="cer.id"
                            v-text="cer.name"/>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Institute</label>
                        <input type="text" v-model="user_certifications.institute" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <date-picker :title="grantedOn" v-model="user_certifications.granted_on" :default="getDate(user_certifications.started_at)"></date-picker>
                      <date-picker :title="validTo" v-model="user_certifications.valid_to" :default="getDate(user_certifications.ended_at)"></date-picker>
                      <div v-if="hasErrors()" class="errors">
                        <span v-text="errors[0].keys"/>
                      </div>
                      <button type="submit" :disabled="isDisable" class="btn btn-primary mt-4 pr-4 pl-4"><i class="ti-save"></i> Lưu</button>
                    </form>
                  </div>
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
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import DatePicker from "../commons/DatePicker";
import $ from "jquery";
import _ from "lodash";

export default {
  name: "AddCertification",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      certifications: {},
      user_certifications: {
        certification_id: "",
        institute: "",
        granted_on: "",
        valid_to: "",
        emp_id: this.empId,
        id: ""
      },
      grantedOn: "Granted On",
      validTo: "Valid To",
      errors: [],
      isDisable: false,
      userCertifications: []
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date();
    },
    getCertifications() {
      rf.getRequest("CertificationRequest")
        .getAll()
        .then(res => {
          this.certifications = res;
        });
    },
    getCertificationsUser() {
      const param = {
        emp_id: this.empId
      };

      rf.getRequest("CertificationUserRequest")
        .getAll(param)
        .then(res => {
          this.userCertifications = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_certifications, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        this.isDisable = false;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (this.user_certifications.id) {
        return rf
          .getRequest("CertificationUserRequest")
          .update(this.user_certifications)
          .then(res => {
            if (res.status) {
              this.clearData();
              $(this.$refs.add_modal).modal("hide");
              this.getCertificationsUser();
            }
          });
      }
      rf.getRequest("CertificationUserRequest")
        .store(this.user_certifications)
        .then(res => {
          if (res.status) {
            this.clearData();
            $(this.$refs.add_modal).modal("hide");
            this.getCertificationsUser();
          }
        });
    },
    showModalUpdate(certification) {
      this.user_certifications.qualification_id =
        certification.certification_id;
      this.user_certifications.institute = certification.institute;
      this.user_certifications.started_at = certification.granted_on;
      this.user_certifications.ended_at = certification.valid_to;
      this.user_certifications.id = certification.id;
      $(this.$refs.add_modal).modal("show");
    },
    remove(certification) {
      rf.getRequest("CertificationUserRequest")
        .destroy({ id: certification.id })
        .then(res => {
          if (res.status) {
            this.getCertificationsUser();
          }
        });
    },
    clearData() {
      this.user_certifications.certification_id = "";
      this.user_certifications.institute = "";
      this.user_certifications.id = "";
      this.isDisable = false;
    },
    init() {
      this.getCertifications();
      this.getCertificationsUser();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="sass">
button::disabled
  cursor: not-allowed
#detail-kni
  resize: none;
.form-group
  margin-bottom: 10px
a.icon-p  
  font-weight: 800
  font-size: 22px !important
  span.icon
    background: #fff
    height: 30px
    width: 30px
    display: inline-block
    color: #8148fd
    font-size: 22px
    font-weight: 900
    padding-left: 4px
    margin-right: 30px
.but
  border: 1px solid #bfbfbf
  color: blue
  font-size: 20px
  background-color: transparent
  position: absolute
  top: 0
  padding: 5px
  &.but-del
    right: 0
    border-right: none
    border-left: none
    border-top: none
  &.but-edit
    right: 30px
    border-top: none
    border-radius: 0 0 0 5px
</style>
