<template>
  <div class="data-tables">
    <table ref="dataTable" class="text-center">
      <thead class="bg-light text-capitalize">
          <tr>
            <slot></slot>
          </tr>
      </thead>
      <tbody>
        <slot name="body" v-for="row in rows" :item="row"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "DataTable",
  props: {
    getData: {
      type: Function
    }
  },
  data() {
    return {
      rows: [],
      errors: {},
      table: ""
    };
  },
  watch: {},
  methods: {
    fetch() {
      this.getData()
        .then(res => (this.rows = res))
        .catch(err => this.handleErr(err));
    },
    handleErr(err) {
      this.errors = err;
    },
    initTable() {
      this.table = $(this.$refs.dataTable).DataTable({
        responsive: true,
        destroy: true
      });
    },
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    refresh() {
      this.fetch();
    }
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.sleep(1000).then(() => this.initTable());
  }
};
</script>

<style scoped lang="sass">
.dataTable
  thead
    .sorting,
    .sorting_desc,
    .sorting_asc
      background-image: none
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
</style>
