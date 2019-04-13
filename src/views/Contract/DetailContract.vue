<template>
  <div class="col-12 mt-5">
    <div class="card">
      <div class="card-body">
        <e-profile :id="empId"/>
      </div>
    </div>
  </div>
</template>

<script>
import EProfile from '../../components/employee/EProfile'

export default {
  name: 'EmployeeProfile',
  components: {
    EProfile
  },
  data() {
    return {
      headerTitle: 'Thông tin cá nhân',
      breadcrumbs: [{ title: 'Thông tin cá nhân', href: '' }],
      empId: '',
      employee: {}
    }
  },
  created() {
    const route = this.$route.path
    this.empId = route.split('/')[3]
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
