<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-education">
          <span class="icon"><i class="ti-plus"></i></span>Education
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userEducations">
          <div class="list-group-item sub-tab-item" v-for="(edu, i) in userEducations" :key="i">
            <h5 class="list-group-item-heading">{{ edu.name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeSkill(edu)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(edu)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Start: {{ edu.started_at }}</p>
            <p class="list-group-item-text">Completed: {{ edu.ended_at }}</p>
            <p class="list-group-item-text">Institute: {{ edu.institute }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade show" ref="add_modal" id="add-education">
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
                        <label for="kni">Qualification</label>
                        <select v-model="user_educations.qualification_id" id="kni" class="form-control">
                          <option value="">Lựa chọn Qualification</option>
                          <option v-for="(qua, index) in qualifications"
                            :key="index"
                            :value="qua.id"
                            v-text="qua.name"/>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Institute</label>
                        <input type="text" v-model="user_educations.institute" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <date-picker :title="startedAt" v-model="user_educations.started_at" :default="getDate(user_educations.started_at)"></date-picker>
                      <date-picker :title="endedAt" v-model="user_educations.ended_at" :default="getDate(user_educations.ended_at)"></date-picker>
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
  name: "AddEducations",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      qualifications: {},
      user_educations: {
        qualification_id: "",
        institute: "",
        started_at: "",
        ended_at: "",
        emp_id: this.empId,
        id: ""
      },
      startedAt: "Start Date",
      endedAt: "Completed On",
      errors: [],
      isDisable: false,
      userEducations: []
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
    getQuatifications() {
      rf.getRequest("QualificationRequest")
        .getAll()
        .then(res => {
          this.qualifications = res;
        });
    },
    getEducations() {
      const param = {
        emp_id: this.empId
      };

      rf.getRequest("EducationRequest")
        .getAll(param)
        .then(res => {
          this.userEducations = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_educations, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        this.isDisable = false;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (this.user_educations.id) {
        return rf
          .getRequest("EducationRequest")
          .update(this.user_educations)
          .then(res => {
            if (res.status) {
              this.clearData();
              $(this.$refs.add_modal).modal("hide");
              this.getEducations();
            }
          });
      }
      rf.getRequest("EducationRequest")
        .store(this.user_educations)
        .then(res => {
          if (res.status) {
            this.clearData();
            $(this.$refs.add_modal).modal("hide");
            this.getEducations();
          }
        });
    },
    showModalUpdate(qualification) {
      this.user_educations.qualification_id = qualification.qualification_id;
      this.user_educations.institute = qualification.institute;
      this.user_educations.started_at = qualification.started_at;
      this.user_educations.ended_at = qualification.ended_at;
      this.user_educations.id = qualification.id;
      $(this.$refs.add_modal).modal("show");
    },
    removeSkill(qualification) {
      rf.getRequest("EducationRequest")
        .destroy({ id: qualification.id })
        .then(res => {
          if (res.status) {
            this.getEducations();
          }
        });
    },
    clearData() {
      this.user_educations.qualification_id = "";
      this.user_educations.institute = "";
      this.user_educations.id = "";
      this.isDisable = false;
    },
    init() {
      this.getQuatifications();
      this.getEducations();
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
