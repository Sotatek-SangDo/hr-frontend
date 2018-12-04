<template>
  <home-layout>
    <template slot="main-content">
      <div class="epm-tb-header">
        <h4 class="header-title">Company</h4>
      </div>
      <data-table :getData="getCompany" ref="datatable">
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <template slot="body" slot-scope="props">
          <tr>
            <td v-text="props.item.name"></td>
            <td v-text="props.item.email"/>
            <td v-text="props.item.phone_number"/>
            <td v-text="props.item.address"/>
          </tr>
        </template>
      </data-table>
    </template>
  </home-layout>
</template>

<script>
import DataTable from "../../components/commons/DataTable";
import MasterView from "../MasterView";
import HomeLayout from "../../components/HomeLayout";
import rf from "../../requests/RequestFactory";

export default {
  extends: MasterView,
  components: {
    HomeLayout,
    DataTable
  },
  methods: {
    getCompany() {
      return rf.getRequest("CompanyRequest").getComFullContact();
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
