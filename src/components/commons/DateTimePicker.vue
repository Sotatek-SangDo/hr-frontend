<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <div ref="datetimepicker" class="input-group date">
      <input class="form-control" type="text" :value="value"/>
      <span class="input-group-addon">
        <i class="ti-calendar"></i>
      </span>
    </div>
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
    },
    default: {
      type: Date
    }
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    onChange() {},
    init() {
      const self = this;
      $(self.$refs.datetimepicker).datetimepicker({
        defaultDate: self.date,
        format: "YYYY-MM-DD HH:mm"
      });
    }
  },
  mounted() {
    this.date = this.default;
    this.init();
  }
};
</script>
<style lang="sass">
.input-group-addon
  padding: 8px 28px
  background-color: #eaedf0
  border: 1px solid #f3d9d9
  border-radius: 0 5px 5px 0
  font-size: 26px
</style>
