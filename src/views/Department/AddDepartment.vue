<template>
  <add-department-layout :header="header" :department-id="departmentId"/>
</template>

<script>
import AddDepartmentLayout from '@/components/department/AddDepartment'

export default {
  name: 'AddDepartment',
  components: {
    AddDepartmentLayout
  },
  data() {
    return {
      header: this.$t('department.add'),
      departmentId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.departmentId = route.split('/')[3]
    this.header = this.$t('department.edit')
  },
  mounted() {
    this.inital()
  },
  methods: {
    inital() {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
