<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <!-- data table start -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" href="#profile" role="tab" data-toggle="tab">Nha vien </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">buzz</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#references" role="tab" data-toggle="tab">references</a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane fade active in show" id="profile">
          <div class="col-12 mt-5">
            <div class="card" v-show="listStep">
              <div class="card-body">
                <div class="epm-tb-header">
                  <h4 class="header-title">Danh sach Nhan vien</h4>
                  <a href="#" @click="goToAddPage">
                    <span><i class="ti-plus"></i>   Thêm mới</span>
                  </a>
                </div>
                <data-table :getData="getEmployees" ref="datatable">
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start Date</th>
                  <th>salary</th>
                  <template slot="body" slot-scope="props">
                    <tr>
                      <td v-text="props.item.name"></td>
                      <td>Accountant</td>
                      <td v-text="props.item.address"/>
                      <td v-text="props.item.phone"/>
                      <td v-text="props.item.birthday"/>
                      <td v-text="props.item.private_email"/>
                    </tr>
                  </template>
                </data-table>
              </div>
            </div>
            <div class="add-form" v-show="addStep">
              <add-employee></add-employee>
            </div>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane fade" id="buzz">bbb</div>
        <div role="tabpanel" class="tab-pane fade" id="references">ccc</div>
      </div>
    </template>
  </home-layout>
</template>

<script>
import DataTable from "../../components/commons/DataTable.vue";
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout.vue";
import AddEmployee from "./AddEmployee.vue";
import rf from "../../requests/RequestFactory";

export default {
  extends: MasterView,
  components: {
    HomeLayout,
    AddEmployee,
    DataTable
  },
  data() {
    return {
      headerTitle: "Nhan vien",
      tabs: [
        "Nhan vien",
        "Ky nang",
        "Hoc van",
        "Chung chi",
        "Ngon ngu",
        "Phong ban",
        "Danh ba khan cap"
      ],
      subTabs: [
        "Thong tin co ban",
        "Trinh do chuyen mon",
        "Gia dinh",
        "Tai lieu"
      ],
      breadcrumbs: [
        { title: "Home", href: "/" },
        { title: "Nhan vien", href: "" }
      ],
      addStep: false,
      listStep: true
    };
  },
  created() {
    this.getEmployees();
  },
  methods: {
    goToAddPage(e) {
      e.preventDefault();
      this.addStep = true;
      this.listStep = false;
    },
    getEmployees() {
      return rf.getRequest("EmployeeRequest").getAll();
    },
    inital() {
      this.getEmployees();
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
</style>
