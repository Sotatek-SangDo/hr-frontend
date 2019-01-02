<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Danh sách chứng chỉ</h4>
      </div>
      <data-table :getData="getECertifications" ref="datatable">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Chứng chỉ</th>
          <th>Ngày cấp</th>
          <th>Có giá trị đến</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"
                v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
                v-bind:rowspan="props.item.employee.count_certification"/>
            <td v-text="props.item.certification_name" />
            <td v-text="props.item.granted_on" />
            <td v-text="props.item.valid_to"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeCertification(props.item)">
                <i class="ti-trash"></i>
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addCertification(props.item)">
               <i class="ti-plus"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
      <certification-modal :certification="user_certification" :is-create="isCreate" :emp-id="empId" v-if="isShow"></certification-modal>
    </div>
  </div>
</template>

<script>
import rf from "../../requests/RequestFactory";
import DataTable from "../commons/DataTable";
import MasterView from "../../views/MasterView";
import CertificationModal from "../commons/EmployeeModal/CertificationModal";

export default {
  name: "EmployeeCertification",
  extends: MasterView,
  components: {
    DataTable,
    CertificationModal
  },
  data() {
    return {
      user_certification: {
        certification_id: "",
        institute: "",
        granted_on: "",
        valid_to: "",
        emp_id: "",
        id: ""
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: "certification-modal"
    };
  },
  methods: {
    getECertifications() {
      return rf.getRequest("CertificationUserRequest").getAll();
    },
    addCertification(certification) {
      this.user_certification.emp_id = certification.emp_id;
      this.empId = certification.emp_id;
      this.isCreate = true;
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
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      window.EventBus.$on("add-eCertification", () => this.tableRefresh());
      window.EventBus.$on("update-eCertification", () => this.tableRefresh());
      window.EventBus.$on("delete-eCertification", () => this.tableRefresh());
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
.epm-tb-header
  margin: 20px auto
</style>
