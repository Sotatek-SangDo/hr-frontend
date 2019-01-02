<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addCertification">
          <span class="icon"><i class="ti-plus"></i></span>Chứng chỉ
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userCertifications">
          <div class="list-group-item sub-tab-item" v-for="(cer, i) in userCertifications" :key="i">
            <h5 class="list-group-item-heading">{{ cer.certification_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeCertification(cer)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(cer)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Ngày cấp: {{ cer.granted_on }}</p>
            <p class="list-group-item-text">Có giá trị đến: {{ cer.valid_to }}</p>
            <p class="list-group-item-text">Học tại: {{ cer.institute }}</p>
          </div>
        </div>
      </div>
    </div>
    <certification-modal v-if="isShow" :emp-id="empId" :isCreate="isCreate" :certification="user_certification"></certification-modal>
  </div>
</template>

<script>
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import CertificationModal from "../../components/commons/EmployeeModal/CertificationModal";

export default {
  name: "AddCertification",
  extends: MasterView,
  components: {
    CertificationModal
  },
  data() {
    return {
      user_certification: {
        certification_id: "",
        institute: "",
        granted_on: "",
        valid_to: "",
        emp_id: this.empId,
        id: ""
      },
      userCertifications: [],
      isShow: false,
      modal_id: "certification-modal"
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getCertificationsUser() {
      rf.getRequest("CertificationUserRequest")
        .getECertification({ id: this.empId })
        .then(res => {
          this.userCertifications = res;
        });
    },
    addCertification(e) {
      e.preventDefault();
      this.isCreate = true;
      this.user_certification.emp_id = this.empId;
      this.isShow = true;
      this.addEventShowModal();
    },
    showModalUpdate(certification) {
      this.isCreate = false;
      Object.assign(
        this.user_certification,
        this.setData(this.user_certification, certification)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    removeCertification(certification) {
      if (confirm("Bạn có chắc muốn xóa chứng chỉ này?")) {
        rf.getRequest("CertificationUserRequest")
          .destroy({ id: certification.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit("delete-eCertification", certification);
            }
          });
      }
    },
    clearData() {
      this.user_certification = this.emptyData(this.user_certification);
    },
    onEventCertification() {
      window.EventBus.$on("update-eCertification", eCer => {
        const index = this.userCertifications.findIndex(c => c.id === eCer.id);
        this.userCertifications[index] = eCer;
        this.$forceUpdate();
      });
      window.EventBus.$on("add-eCertification", eCer =>
        this.userCertifications.push(eCer)
      );
      window.EventBus.$on("delete-eCertification", eCer => {
        const index = this.userCertifications.findIndex(c => c.id === eCer.id);
        this.userCertifications.splice(index, 1);
      });
    },
    init() {
      this.getCertificationsUser();
      this.onEventCertification();
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
