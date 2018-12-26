<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title">Trình độ học vấn</h4>
      </div>
      <data-table :getData="getEmpEducation" ref="datatable">
        <th>Tên Nhân viên</th>
        <th>Trình độ chuyên môn</th>
        <th>Học tại</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày hoàn thành</th>
        <th>Thao tác</th>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name" />
            <td v-text="props.item.qualification_name" />
            <td v-text="props.item.institute"/>
            <td v-text="props.item.started_at"/>
            <td v-text="props.item.ended_at"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeEducation(props.item)">
                <i class="ti-trash"></i>
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addEducation(props.item)">
               <i class="ti-plus"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
       <education-modal :education="user_educations" :is-create="isCreate" :emp-id="empId" v-if="isShow"></education-modal>
    </div>
  </div>
</template>
<script>
import rf from "../../requests/RequestFactory";
import DataTable from "../commons/DataTable";
import MasterView from "../../views/MasterView";
import EducationModal from "../commons/EducationModal";

export default {
  name: "EmployeeEducation",
  extends: MasterView,
  components: {
    DataTable,
    EducationModal
  },
  data() {
    return {
      user_educations: {
        qualification_id: "",
        institute: "",
        started_at: "",
        ended_at: "",
        emp_id: this.empId,
        id: ""
      },
      isCreate: true,
      isShow: false,
      empId: 0
    };
  },
  methods: {
    getEmpEducation() {
      return rf.getRequest("EducationRequest").getAll();
    },
    addEducation(eEdu) {
      this.user_educations.emp_id = eEdu.emp_id;
      this.empId = eEdu.emp_id;
      this.isCreate = true;
      this.$forceUpdate();
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
    showModalUpdate(eEdu) {
      this.isCreate = false;
      this.user_educations.qualification_id = eEdu.qualification_id;
      this.user_educations.institute = eEdu.institute;
      this.user_educations.started_at = eEdu.started_at;
      this.user_educations.ended_at = eEdu.ended_at;
      this.user_educations.emp_id = eEdu.emp_id;
      this.user_educations.id = eEdu.id;
      this.$forceUpdate();
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
    removeEducation(eEdu) {
      if (confirm("Bạn có chắc muốn xóa trình độ chuyên môn này?")) {
        rf.getRequest("EducationRequest")
          .destroy({ id: eEdu.id })
          .then(res => {
            if (res.status) {
              this.isShow = false;
              window.EventBus.$emit("delete-eEducation", eEdu);
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
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      window.EventBus.$on("add-eEducation", () => this.tableRefresh());
      window.EventBus.$on("update-eEducation", () => this.tableRefresh());
      window.EventBus.$on("delete-eEducation", () => this.tableRefresh());
    }
  },
  mounted() {
    this.onListener();
  }
};
</script>
<style lang="sass" scoped>
.header-title
  font-size: 24px
table
  tr
    th
      text-align: left
    td
      text-align: left
      padding-left: 20px !important
</style>
