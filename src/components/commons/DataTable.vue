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
      errors: {}
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
      $(this.$refs.dataTable).DataTable({
        responsive: true,
        destroy: true
      });
    },
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
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

<style scoped>
</style>
