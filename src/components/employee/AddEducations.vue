<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addEducation">
          <span class="icon"><i class="ti-plus"></i></span>Trình độ chuyên môn
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userEducations">
          <div class="list-group-item sub-tab-item" v-for="(edu, i) in userEducations" :key="i">
            <h5 class="list-group-item-heading">{{ edu.qualification_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeEducation(edu)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(edu)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Ngaỳ bắt đầu: {{ edu.started_at }}</p>
            <p class="list-group-item-text">Ngày hoàn thành: {{ edu.ended_at }}</p>
            <p class="list-group-item-text">Học tại: {{ edu.institute }}</p>
          </div>
        </div>
      </div>
    </div>
    <education-modal :education="user_educations" :is-create="isCreate" :emp-id="empId" v-if="isShow"></education-modal>
  </div>
</template>

<script>
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import EducationModal from "../commons/EducationModal";

export default {
  name: "AddEducations",
  extends: MasterView,
  components: {
    EducationModal
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
      isShow: false,
      isCreate: true,
      userEducations: []
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getEducations() {
      rf.getRequest("EducationRequest")
        .getEmployeeEducation({ id: this.empId })
        .then(res => {
          this.userEducations = res;
        });
    },
    addEducation(e) {
      e.preventDefault();
      this.isCreate = true;
      this.isShow = true;
      this.sleep(500).then(() => {
        this.showModal("education-modal");
        this.onHiddenModal(
          "education-modal",
          function() {
            this.clearData();
            this.isShow = false;
          }.bind(this)
        );
      });
    },
    showModalUpdate(qualification) {
      this.isCreate = false;
      this.user_educations.qualification_id = qualification.qualification_id;
      this.user_educations.institute = qualification.institute;
      this.user_educations.started_at = qualification.started_at;
      this.user_educations.ended_at = qualification.ended_at;
      this.user_educations.id = qualification.id;
      this.isShow = true;
      this.sleep(500).then(() => {
        this.showModal("education-modal");
        this.onHiddenModal(
          "education-modal",
          function() {
            this.clearData();
            this.isShow = false;
          }.bind(this)
        );
      });
    },
    removeEducation(qualification) {
      if (confirm("Bạn có chắc muốn khóa trình đọ chuyên môn này?")) {
        rf.getRequest("EducationRequest")
          .destroy({ id: qualification.id })
          .then(res => {
            if (res.status) {
              this.userEducations.splice(
                this.userEducations.indexOf(qualification),
                1
              );
            }
          });
      }
    },
    clearData() {
      this.user_educations.qualification_id = "";
      this.user_educations.institute = "";
      this.user_educations.id = "";
      this.user_educations.started_at = "";
      this.user_educations.ended_at = "";
    },
    init() {
      this.getEducations();
      this.onEventEducation();
    },
    onEventEducation() {
      window.EventBus.$on("update-eEducation", eEdu => {
        const index = this.userEducations.findIndex(s => s.id === eEdu.id);
        this.userEducations[index] = eEdu;
        this.$forceUpdate();
      });
      window.EventBus.$on("add-eEducation", eEdu => {
        this.userEducations.push(eEdu);
      });
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
