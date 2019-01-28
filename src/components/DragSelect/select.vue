<template>
  <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" v-on="$listeners">
    <slot/>
  </el-select>
</template>

<script>
export default {
  name: 'DragSelect',
  props: {
    value: {
      required: true,
      type: [String, Array, Number, Object]
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped>
.drag-select {
  width: 100%;
}
.drag-select >>> .sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}

.drag-select >>> .el-tag{
  cursor: pointer;
}
</style>
