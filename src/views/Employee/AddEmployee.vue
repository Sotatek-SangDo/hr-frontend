<template>
  <add-employee :is-create="isCreate" :header="header"/>
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
      isCreate: true,
      header: 'Thêm mới'
    }
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
