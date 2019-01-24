<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <div ref="datetimepicker" class="input-group date">
      <input :value="value" class="form-control" type="text">
      <span class="input-group-addon">
        <i class="ti-calendar"/>
      </span>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DatePicker',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    default: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    this.date = this.default
    this.init()
  },
  methods: {
    onChange() {},
    init() {
      const self = this
      $(self.$refs.datetimepicker).datetimepicker({
        defaultDate: self.date,
        format: 'YYYY-MM-DD HH:mm'
      })
    }
  }
}
</script>
<style lang="sass">
.input-group-addon
  padding: 8px 28px
  background-color: #eaedf0
  border: 1px solid #f3d9d9
  border-radius: 0 5px 5px 0
  font-size: 26px
</style>
