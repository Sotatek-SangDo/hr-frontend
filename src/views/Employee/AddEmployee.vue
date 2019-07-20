<template>
  <add-employee :header="header" :emp-id="empId"/>
</template>

<script>
import AddEmployee from '../../components/employee/AddEmployee'

export default {
  name: 'EmployeeAdd',
  components: {
    AddEmployee
  },
  data() {
    return {
      header: this.$t('employee.add'),
      empId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.empId = route.split('/')[3]
    this.header = this.$t('employee.edit')
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
