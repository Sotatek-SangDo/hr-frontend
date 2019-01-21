<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addCandidate">
          <span>Thêm mới</span>
        </a>
        <!-- <div class="input-file-container">  
          <input class="input-file" id="my-file" type="file" @change="importData">
          <label tabindex="0" for="my-file" class="input-file-trigger" v-text="importText" />
        </div> -->
      </div>
      <data-table :getData="getCandidates" ref="datatable">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Họ và tên</th>
          <th>Email</th>
          <th>Giới tính</th>
          <th>Số điện thoại</th>
          <th>Ngày sinh</th>
          <th>ĐỌt tuyển dụng</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"></td>
            <td v-text="props.item.email"/>
            <td v-text="props.item.gender"/>
            <td v-text="props.item.phonenumber"/>
            <td v-text="props.item.birthday"/>
            <td v-text="props.item.applied_job_status.recruitment.name"/>
            <td v-text="props.item.applied_job_status.status"/>
            <td>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateCandidate(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <candidate-modal v-if="isShow" :prop-candidate="candidate" :is-create="isCreate"></candidate-modal>
  </div>
</template>

<script>
import MasterView from "../../views/MasterView";
import DataTable from "../commons/DataTable";
import rf from "../../requests/RequestFactory";
import CandidateModal from "../commons/RecruitmentModal/CandidateModal";

export default {
  name: "CandidateLayout",
  extends: MasterView,
  components: {
    DataTable,
    CandidateModal
  },
  data() {
    return {
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
      isShow: false,
      isCreate: true,
      modal_id: "candidate-modal",
      importText: "Import file..."
    }
  },
  methods: {
    getCandidates() {
      return rf.getRequest("CandidateRequest").getAll();
    },
    addCandidate(e) {
      e.preventDefault();
      this.isCreate = true;
      this.isShow = true;
      this.addEventShowModal();
    },
    importData(e) {
      this.importText = e.target.files[0].name;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      rf.getRequest("CandidateRequest")
        .importExcelData(formData)
        .then(res => {
          console.log(res);
        });
    },
    updateCandidate(candidate) {
      this.isCreate = false;
      Object.assign(
        this.candidate,
        this.setData(this.candidate, candidate)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    clearData() {
      this.candidate = this.emptyData(this.candidate);
    },
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      window.EventBus.$on("add-candidate", () => this.tableRefresh());
      window.EventBus.$on("update-candidate", () => this.tableRefresh());
    }
  },
  mounted() {
    this.onListener();
  }
};
</script>

<style lang="sass" scoped>
.input-file-container
  position: relative
  width: 225px
.js
  .input-file-trigger
    display: block
    padding: 14px 45px
    background: #39D2B4
    color: #fff
    font-size: 1em
    transition: all .4s
    cursor: pointer
  .input-file
    position: absolute
    top: 0; left: 0
    width: 225px
    opacity: 0
    padding: 14px 0
    cursor: pointer
  .file-return
    font-style: italic
    font-size: .9em
    font-weight: bold
    &:not(:empty):before
      content: "Selected file: "
      font-style: normal
      font-weight: normal
  .input-file:hover + .input-file-trigger,
  .input-file:focus + .input-file-trigger,
  .input-file-trigger:hover,
  .input-file-trigger:focus
    background: #34495E
    color: #39D2B4
.file-return
  margin: 0
  &:not(:empty)
    margin: 1em 0
.epm-tb-header
  margin-bottom: 15px
  a
    cursor: pointer
    &.button-add
      height: 58px
      margin-right: 10px
table
  thead
    th
      font-size: 13px
      line-height: 40px !important
      &.sort:after,
      &.sort:before
        top: 0 !important
      &:last-child:after,
      &:last-child:before
        content: unset !important
  tbody
    tr
      cursor: pointer
</style>
