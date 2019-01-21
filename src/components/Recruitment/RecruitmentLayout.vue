<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addRecruitment">
          <span>Thêm mới</span>
        </a>
      </div>
      <data-table :getData="getRecruitments" ref="datatable">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Tên đợt tuyển dụng</th>
          <th>Thời gian bắt đầu</th>
          <th>Thời gian kết thúc</th>
          <th>Hạn nộp hồ sơ</th>
          <th>Số lượng</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr @click="detailPage(props.item.id)">
            <td v-text="props.item.name"></td>
            <td v-text="props.item.started_at"/>
            <td v-text="props.item.ended_at"/>
            <td v-text="props.item.expired_at"/>
            <td v-text="props.item.num"/>
            <td v-text="props.item.status"/>
            <td>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateRecruitment(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <recruitment-modal v-if="isShow" :recruitment="recruitment" :is-create="isCreate"></recruitment-modal>
  </div>
</template>

<script>
import MasterView from "../../views/MasterView";
import DataTable from "../commons/DataTable";
import rf from "../../requests/RequestFactory";
import RecruitmentModal from "../commons/RecruitmentModal/RecruitmentModal";

export default {
  name: "RecruitmentLayout",
  extends: MasterView,
  components: {
    DataTable,
    RecruitmentModal
  },
  data() {
    return {
      recruitment: {
        name: "",
        started_at: "",
        ended_at: "",
        status: "",
        expired_at: "",
        num: "",
        recruitment_required: "",
        id: ""
      },
      isShow: false,
      isCreate: true,
      modal_id: "recruitment-modal"
    };
  },
  methods: {
    detailPage(param) {
      return this.$router.push({
        name: "recruitment-detail",
        query: { id: param }
      });
    },
    getRecruitments() {
      return rf.getRequest("RecruitmentRequest").getAll();
    },
    addRecruitment(e) {
      e.preventDefault();
      this.isCreate = true;
      this.isShow = true;
      this.addEventShowModal();
    },
    updateRecruitment(recruitment) {
      this.isCreate = false;
      Object.assign(
        this.recruitment,
        this.setData(this.recruitment, recruitment)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    clearData() {
      this.recruitment = this.emptyData(this.recruitment);
    },
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      window.EventBus.$on("add-recruitment", () => this.tableRefresh());
      window.EventBus.$on("update-recruitment", () => this.tableRefresh());
    }
  },
  mounted() {
    this.onListener();
  }
};
</script>

<style lang="sass" scoped>
.epm-tb-header
  margin-bottom: 15px
  a
    cursor: pointer
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
