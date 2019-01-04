<template>
  <div class="data-tables">
    <table ref="dataTable" class="dataTable text-center">
      <thead class="bg-light text-capitalize">
          <tr>
            <slot name="head" :sort="sort"></slot>
          </tr>
      </thead>
      <tbody>
        <slot name="body" v-for="(row, i) in sortRows" :item="row" :data="sortRows" :index="i"></slot>
      </tbody>
    </table>
    <div class="dataTables_paginate" v-if="hasPagination && pageNumber">
      <ul class="pagination">
        <li class="paginate_button page-item" :class="!canPrev() ? 'disabled' : ''">
          <a class="page-link" href="#" @click="prevPage">&laquo;</a>
        </li>
        <li class="paginate_button page-item" :class="i !== currentPage || 'active'" v-for="i in (1, pageNumber)" :key="i">
          <a class="page-link" href="#" @click="goToPage(i, $event)" v-text="i"/>
        </li>
        <li class="paginate_button page-item" :class="!canNext() ? 'disabled' : ''">
          <a class="page-link" href="#" @click="nextPage">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";

export default {
  name: "DataTable",
  props: {
    getData: {
      type: Function
    },
    options: {
      type: Object
    },
    hasPagination: {
      default: true
    }
  },
  data() {
    return {
      rows: [],
      errors: {},
      table: "",
      defaultOption: {
        responsive: true,
        destroy: true,
        language: {
          lengthMenu: "Hiển thị _MENU_ dữ liệu",
          sZeroRecords: "Không có dữ liệu",
          sInfoEmpty: "Không có dữ liệu hiển thị",
          sInfo: "Hiển thị _START_ đến _END_ của _TOTAL_ dữ liệu",
          sSearch: "Tìm kiếm:",
          oPaginate: {
            sNext: "Sau",
            sPrevious: "Trước"
          }
        }
      },
      DESC: "desc",
      ASC: "asc",
      currentSort: "name",
      currentSortDir: "desc",
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    optionTable() {
      return _.isEmpty(this.options) ? this.defaultOption : this.options;
    },
    sortRows() {
      return this.rows
        .filter((row, index) => {
          if (this.hasPagination) {
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            if (index >= start && index < end) return true;
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === this.DESC) modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
    },
    pageNumber() {
      if (!(this.rows.length % this.pageSize)) {
        return this.rows.length / this.pageSize;
      }
      return parseInt(this.rows.length / this.pageSize + 1);
    }
  },
  methods: {
    fetch() {
      this.getData()
        .then(res => ([...this.rows] = res))
        .catch(err => this.handleErr(err));
    },
    canNext() {
      return this.currentPage + 1 <= this.pageNumber;
    },
    canPrev() {
      return this.currentPage - 1;
    },
    handleErr(err) {
      this.errors = err;
    },
    initTable() {
      //this.table = $(this.$refs.dataTable).DataTable(this.optionTable);
    },
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    refresh() {
      this.fetch();
    },
    sort(s, $event) {
      this.handleSortEvent($event);
      if (s === this.currentSort) {
        this.currentSortDir =
          this.currentSortDir === this.ASC ? this.DESC : this.ASC;
      }
      this.currentSort = s;
    },
    handleSortEvent(e) {
      const th = $(e.target);
      const className =
        this.currentSortDir === this.ASC ? "sorting_desc" : "sorting_asc";
      const removeClass =
        this.currentSortDir === this.ASC ? "sorting_asc" : "sorting_desc";
      th.removeClass(removeClass).addClass(className);
    },
    goToPage(page, event) {
      event.preventDefault();
      if (this.currentPage === page) return;
      this.currentPage = page;
    },
    nextPage(e) {
      e.preventDefault();
      if (this.currentPage * this.pageSize < this.rows.length)
        this.currentPage++;
    },
    prevPage(e) {
      e.preventDefault();
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  created() {
    this.fetch();
  },
  mounted() {
    //this.sleep(1000).then(() => this.initTable());
  }
};
</script>

<style scoped lang="sass">
.data-tables
  margin: 0 auto
  clear: both
  width: 100%
  @media screen and (max-width: 415px)
    display: block
    overflow-x: auto;
  table
    width: 100%
    background-color: #fff
    border-radius: 10px 10px 0 0
    thead
      position: relative
      box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1)
      -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1)
      -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1)
      tr
        background-color: #6c7ae0
        th
          text-align: start
          border-bottom: none
          line-height: 1.6
          color: #fff
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          padding-left: 15px
          &.sort
            cursor: pointer
          &:last-child
            &:after, &:before
              content: ""
          &:first-child
            border-radius: 10px 0 0 0
          &:last-child
            border-radius: 0 10px 0 0
          &:after, &:before
            color: #fff
            font-size: 28px;
            top: 8px;
          &:after
            right: 0
          &:before
            right: 8px
      .sorting,
      .sorting_desc,
      .sorting_asc
        background-image: none
    tbody
      tr
        border: none
        &:nth-child(even)
          background-color: #f8f6ff
        td[rowspan]
          border-right: 1px solid #e8e8f1
          background-color: #f8f6ff
        td
          text-align: start
          font-size: 16px
          color:#343232
          line-height: 1.4
          padding: 15px
          border: none
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          i.ti-search
            font-size: 23px
            margin-left: 12px
            font-weight: 900
    .btn
      margin-right: 10px;
      padding: 5px 10px
      outline: none
      border: none
      font-size: 18px
      color: #fff
      &.btn-del
        background-color: red
      &.btn-edit
        background-color: green
      &.btn-add
        background-color: pink
.dataTables_paginate
    .pagination
      display: inline-block
      padding-left: 0
      margin: 20px 0
      border-radius: 4px
      float: right
      li.paginate_button
        float: left
        padding: 0
        margin: 0
        display: unset
        &:first-child>a
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        &:first-child>a
          margin-left: 0;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        &:active,
        &:visited,
        &:focus
          border: none
          outline: none
          box-shadow: none
        a
          &:active
            border: none
            outline: none
            box-shadow: none
</style>
