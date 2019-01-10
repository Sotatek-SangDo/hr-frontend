<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <a class="button-add button" @click="addInsurancePayment">
          <span>Thêm mới</span>
        </a>
      </div>
      <data-table :getData="getInsurancePayments" ref="datatable">
        <template slot="head" slot-scope="props">
          <th class="sort sorting_asc" @click="props.sort('name', $event)">Tên đợt thanh toán</th>
          <th class="sort sorting_asc" @click="props.sort('time', $event)">Thời gian</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr @click="detailPage(props.item.id)">
            <td v-text="props.item.name"></td>
            <td v-text="props.item.time"/>
            <td>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="updateInsurancePayment(props.item)">
                <i class="ti-marker-alt"></i>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <insurance-modal v-if="isShow" :prop-insurance="insurance" :is-create="isCreate"></insurance-modal>
  </div>
</template>

<script>
import MasterView from "../../views/MasterView";
import DataTable from "../commons/DataTable";
import rf from "../../requests/RequestFactory";
import InsuranceModal from "../commons/InsuranceModal/InsuranceModal";

export default {
  name: "InsuranceLayout",
  extends: MasterView,
  components: {
    DataTable,
    InsuranceModal
  },
  data() {
    return {
      insurancePayment: {
        title: "",
        time: "",
        id: ""
      },
      isShow: false,
      isCreate: true,
      modal_id: "insurance-payment-modal"
    };
  },
  methods: {
    detailPage(param) {
      return this.$router.push({
        name: "insurance-payment-detail",
        query: { id: param }
      });
    },
    getInsurancePayments() {
      return rf.getRequest("InsurancePaymentRequest").getAll();
    },
    addInsurancePayment(e) {
      e.preventDefault();
      this.isCreate = true;
      this.isShow = true;
      this.addEventShowModal();
    },
    updateInsurancePayment(insurancePayment) {
      this.isCreate = false;
      Object.assign(
        this.insurancePayment,
        this.setData(this.insurance, insurancePayment)
      );
      this.isShow = true;
      this.addEventShowModal();
    },
    clearData() {
      this.insurancePayment = this.emptyData(this.insurancePayment);
    },
    tableRefresh() {
      this.$refs.datatable.refresh();
      this.isShow = false;
    },
    onListener() {
      window.EventBus.$on("add-ip", () => this.tableRefresh());
      window.EventBus.$on("update-ip", () => this.tableRefresh());
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
