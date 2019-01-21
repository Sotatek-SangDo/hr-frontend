<template>
  <div class="form-group">
    <label>{{ title }}</label>
    <div ref="datepicker" class="input-group date" data-date-format="dd-mm-yyyy">
      <input ref="input" class="form-control" type="text" readonly>
      <span class="input-group-addon">
        <i class="ti-calendar"/>
      </span>
    </div>
    <input :value="value" type="hidden" @input="onChange">
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DatePicker',
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
      $(self.$refs.datepicker)
        .datepicker({
          autoclose: true,
          todayHighlight: true
        })
        .datepicker('update', self.date)
        .on('changeDate', function(e) {
          const date = e.format('dd-mm-yyyy')
          self.$emit('input', date)
        })
    }
  }
}
</script>
<style lang="sass">
.input-group-addon
  padding: 8px 14px
  background-color: #eaedf0
  border: 1px solid #f3d9d9
  border-radius: 0 5px 5px 0
  font-size: 26px
</style>
