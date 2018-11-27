<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <div ref="datepicker" class="input-group date" data-date-format="dd-mm-yyyy">
      <input class="form-control" ref="input" type="text" readonly/>
      <span class="input-group-addon">
        <i class="ti-calendar"></i>
      </span>
    </div>
    <input type="hidden" @input="onChange" :value="value">
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "DatePicker",
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    onChange() {},
    init() {
      const self = this;
      $(self.$refs.datepicker)
        .datepicker({
          autoclose: true,
          todayHighlight: true
        })
        .datepicker("update", new Date())
        .on("changeDate", function(e) {
          const date = e.format("dd-mm-yyyy");
          self.$emit("input", date);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="sass">
.input-group-addon
  padding: 8px 14px
  background-color: #eaedf0
  border-left: 1px solid #f3d9d9
  border-radius: 0 5px 5px 0
  font-size: 26px
</style>
