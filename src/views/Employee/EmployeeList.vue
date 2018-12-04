<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <tab-slide :tabs="tabs">
        <div role="tabpanel" class="tab-pane fade active in show" id="nv">
          <div class="col-12 mt-5">
            <div v-if="addStep || profileStep">
              <span class="back" @click="goToAddPage('list')">Quay lại</span>
            </div>
            <div class="card" v-show="listStep">
              <div class="card-body">
                <div class="epm-tb-header">
                  <h4 class="header-title">Danh sách nhân viên</h4>
                  <a @click="goToAddPage('add')">
                    <span><i class="ti-plus"></i>Thêm mới</span>
                  </a>
                </div>
                <data-table :getData="getEmployees" ref="datatable">
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start Date</th>
                  <th>salary</th>
                  <th>Thao tac</th>
                  <template slot="body" slot-scope="props">
                    <tr>
                      <td v-text="props.item.name"></td>
                      <td>Accountant</td>
                      <td v-text="props.item.address"/>
                      <td v-text="props.item.phone"/>
                      <td v-text="props.item.birthday"/>
                      <td v-text="props.item.private_email"/>
                      <td>
                        <span @click="empProfile(props.item)">Xem chi tiết</span>
                      </td>
                    </tr>
                  </template>
                </data-table>
              </div>
            </div>
            <div class="add-form" v-if="addStep">
              <add-employee :employee="emp" :header="header"></add-employee>
            </div>
            <div class="profile card" v-if="profileStep">
              <profile-employee :employee="empView"></profile-employee>
            </div>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane fade" id="kn">bbb</div>
        <div role="tabpanel" class="tab-pane fade" id="hv">ccc</div>
        <div role="tabpanel" class="tab-pane fade" id="chc">ccc</div>
        <div role="tabpanel" class="tab-pane fade" id="ngn">ccc</div>
        <div role="tabpanel" class="tab-pane fade" id="pb">ccc</div>
        <div role="tabpanel" class="tab-pane fade" id="dbkc">ccc</div>
      </tab-slide>
    </template>
  </home-layout>
</template>

<script>
import DataTable from "../../components/commons/DataTable";
import MasterView from "../MasterView";
import HomeLayout from "../../components/HomeLayout";
import AddEmployee from "./AddEmployee";
import ProfileEmployee from "./ProfileEmployee";
import TabSlide from "../../components/TabSlide";
import rf from "../../requests/RequestFactory";

export default {
  extends: MasterView,
  components: {
    HomeLayout,
    AddEmployee,
    DataTable,
    ProfileEmployee,
    TabSlide
  },
  data() {
    return {
      headerTitle: "Nhân viên",
      header: "Thêm mới nhân viên",
      tabs: [
        { title: "Nhân viên", href: "nv" },
        { title: "Kỹ nămg", href: "kn" },
        { title: "Học vấn", href: "hv" },
        { title: "Chứng chỉ", href: "chc" },
        { title: "Ngôn ngữ", href: "ngn" },
        { title: "Phòng ban", href: "pb" },
        { title: "Danh bạ khẩn cấp", href: "dbkc" }
      ],
      breadcrumbs: [
        { title: "Home", href: "/" },
        { title: "Nhân viên", href: "" }
      ],
      addStep: false,
      listStep: true,
      profileStep: false,
      empView: {},
      emp: {
        full_name: "",
        nationality_id: "",
        birthday: "",
        gender: "",
        marital_status: "",
        ethnicity: "",
        address: "",
        country: "",
        phone: "",
        private_email: "",
        email: "",
        joined_at: "",
        confirmed_at: "",
        department: "",
        supervisor: "",
        indirect_supervisor: "",
        status: "",
        job: "",
        pay_grade: ""
      }
    };
  },
  methods: {
    empProfile(employeee) {
      this.empView = employeee;
      this.goToAddPage("profile");
    },
    goToAddPage(type) {
      this.showLoader();
      if (type === "list") {
        this.addStep = false;
        this.profileStep = false;
        this.listStep = true;
      }
      if (type === "add") {
        this.addStep = true;
        this.profileStep = false;
        this.listStep = false;
      }
      if (type === "profile") {
        this.addStep = false;
        this.profileStep = true;
        this.listStep = false;
      }
    },
    getEmployees() {
      return rf.getRequest("EmployeeRequest").getEmpFullInfo();
    },
    inital() {
      this.sleep(500).then(() => {
        this.init();
      });
      this.fadeOut();
    }
  },
  mounted() {
    this.inital();
  }
};
</script>
<style scoped lang="sass">
@import url("https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css")
select
  display: none
.content 
  min-height: 86vh
.header-button
  padding: 20px 0 10px 20px
  border-bottom: 1px solid #f4f4f4
.header-button
  a
    i
      font-size: 35px
table 
  margin: 0 auto;
  td
    span
      cursor: pointer
.header-button 
  a
    color: blue
    cursor: pointer
    font-family: Averta-ExtraBold
    font-size: 20px
.header-button
  a
    i
      transition: all 0.5s ease-in-out
.header-button 
  a:hover i
    transform: scale(1.4)
.content-tab
  margin-top: 50px
.content-tab
  .mdl-data-table
    tr:hover
      background-color: rgba(71, 182, 243, 0.4)
.content-tab
  .mdl-data-table
    font-family: Averta
.content-tab
  .mdl-data-table
    th
      font-family: Averta-Bold
      font-size: 15px
      text-align: center
.content-tab
  .mdl-data-table
    tr
      td
        font-size: 13px
        text-align: center
.mdl-tooltip
  background-color: #4fc6ff
  color: white
  border-radius: 5px
  font-size: 15px
  font-family: Averta-Bold
.nav-tabs
  padding: 0 2%
table.dataTable
  thead
    th
      &:after
        font-size: 30px
        top: 0
      &:before
        top: 0
        font-size: 30px
    .sorting_asc
      background-image: none
    .sorting_desc
      background-image: none
    .sorting
      background-image: none
.epm-tb-header
  display: flex
  justify-content: flex-start
  margin-bottom: 20px
  align-item: center
  a
    margin-left: auto
    font-size: 20px
    border: 1px solid #f1f1f1
    background: #8525ff
    color: white
    padding: 10px 15px
    border-radius: 7px
    font-family: Averta-Bold
    font-weight: 600
.back
  color: blue
  cursor: pointer
  font-family: Averta-Bold
  text-decoration: underline
  text-decoration-color: #4d91ff
</style>
