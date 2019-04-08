<template>
  <div class="table">
    <el-table v-if="data && data.length" :data="data" class="skill-table" style="width: 100%;padding-top: 15px;">
      <el-table-column v-for="(c, i) in columns" :key="i" :label="c.label" min-width="200">
        <template slot-scope="scope">
          {{ scope.row[`${c.field}`] }}
        </template>
      </el-table-column>
    </el-table>
    <span v-else>{{ $t('common.no_data') }}</span>
  </div>
</template>
<script>
export default {
  name: 'EmployeeReference',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.columns)
  },
  methods: {

  }
}
</script>
<style lang="sass"></style>
