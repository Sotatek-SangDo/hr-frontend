<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Ngôn ngữ</h4>
      </div>
      <data-table :getData="getELanguages" ref="datatable">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Ngôn ngữ</th>
          <th>Trình độ nghe</th>
          <th>Trình độ nói</th>
          <th>Trình độ đọc</th>
          <th>Trình độ viết</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"
                v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
                v-bind:rowspan="props.item.employee.count_lang"/>
            <td v-text="props.item.language" />
            <td v-text="props.item.listen" />
            <td v-text="props.item.speak"/>
            <td v-text="props.item.read"/>
            <td v-text="props.item.write"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeLanguage(props.item)">
                <i class="ti-trash"></i>
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addLanguage(props.item)">
               <i class="ti-plus"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
      <language-modal :language="user_language" :is-create="isCreate" :emp-id="empId" v-if="isShow"></language-modal>
    </div>
  </div>
</template>

<script>
import rf from "../../requests/RequestFactory";
import DataTable from "../commons/DataTable";
import MasterView from "../../views/MasterView";
import LanguageModal from "../commons/EmployeeModal/LanguageModal";

export default {
  name: "EmployeeLanguage",
  extends: MasterView,
  components: {
    DataTable,
    LanguageModal
  },
  data() {
    return {
      user_language: {
        lang_id: "",
        listen: "",
        speak: "",
        read: "",
        write: "",
        emp_id: "",
        id: ""
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: "language-modal"
    };
  },
  methods: {
    getELanguages() {
      return rf.getRequest("UserLanguagesRequest").getAll();
    },
    addLanguage(lang) {
      this.user_language.emp_id = lang.emp_id;
      this.empId = lang.emp_id;
      this.isCreate = true;
      this.isShow = true;
      this.addEventShowModal();
    },
    showModalUpdate(certification) {
      this.isCreate = false;
      Object.assign(
        this.user_language,
        this.setData(this.user_language, certification)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    removeLanguage(lang) {
      if (confirm("Bạn có chắc muốn xóa ngôn ngữ này?")) {
        rf.getRequest("UserLanguagesRequest")
          .destroy({ id: lang.id })
          .then(res => {
            if (res.status) {
              this.$emit("delete-eLanguage", lang);
            }
          });
      }
    },
    clearData() {
      this.user_language = this.emptyData(this.user_language);
    },
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      this.$on("add-eLanguage", () => this.tableRefresh());
      this.$on("update-eLanguage", () => this.tableRefresh());
      this.$on("delete-eLanguage", () => this.tableRefresh());
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
