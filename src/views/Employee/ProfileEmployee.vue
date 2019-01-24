<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <e-profile :id="empId"/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import EProfile from '../../components/employee/EProfile'

export default {
  name: 'Profile',
  components: {
    HomeLayout,
    EProfile
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Thông tin cá nhân',
      breadcrumbs: [{ title: 'Thông tin cá nhân', href: '' }],
      empId: '',
      employee: {}
    }
  },
  created() {
    this.empId = this.$route.query.id
  },
  mounted() {
    this.inital()
  },
  methods: {
    inital() {
      this.sleep(500).then(() => {
        this.init()
      })
      this.fadeOut()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
