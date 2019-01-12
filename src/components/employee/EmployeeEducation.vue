<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Trình độ học vấn</h4>
      </div>
      <data-table :getData="getEmpEducation" ref="datatable">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Trình độ chuyên môn</th>
          <th>Học tại</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày hoàn thành</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"
              v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
              v-bind:rowspan="props.item.employee.count_edu"/>
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
       <education-modal :education="user_education" :is-create="isCreate" :emp-id="empId" v-if="isShow"></education-modal>
    </div>
  </div>
</template>
<script>
import rf from "../../requests/RequestFactory";
import DataTable from "../commons/DataTable";
import MasterView from "../../views/MasterView";
import EducationModal from "../commons/EmployeeModal/EducationModal";

export default {
  name: "EmployeeEducation",
  extends: MasterView,
  components: {
    DataTable,
    EducationModal
  },
  data() {
    return {
      user_education: {
        qualification_id: "",
        institute: "",
        started_at: "",
        ended_at: "",
        emp_id: "",
        id: ""
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: "education-modal"
    };
  },
  methods: {
    getEmpEducation() {
      return rf.getRequest("EducationRequest").getAll();
    },
    addEducation(eEdu) {
      this.user_education.emp_id = eEdu.emp_id;
      this.empId = eEdu.emp_id;
      this.isCreate = true;
      this.isShow = true;
      this.addEventShowModal();
    },
    showModalUpdate(eEdu) {
      this.isCreate = false;
      Object.assign(
        this.user_education,
        this.setData(this.user_education, eEdu)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    removeEducation(eEdu) {
      if (confirm("Bạn có chắc muốn xóa trình độ chuyên môn này?")) {
        rf.getRequest("EducationRequest")
          .destroy({ id: eEdu.id })
          .then(res => {
            if (res.status) {
              this.isShow = false;
              this.$emit("delete-eEducation", eEdu);
            }
          });
      }
    },
    clearData() {
      this.user_education = this.emptyData(this.user_education);
    },
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      this.$on("add-eEducation", () => this.tableRefresh());
      this.$on("update-eEducation", () => this.tableRefresh());
      this.$on("delete-eEducation", () => this.tableRefresh());
    }
  },
  mounted() {
    this.onListener();
  }
};
</script>
<style lang="sass" scoped>
.epm-tb-header
  margin: 20px auto
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
