<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <ip-detail-layout/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import IpDetailLayout from '../../components/Insurances/IPDetailLayout'

export default {
  name: 'IPDetail',
  components: {
    HomeLayout,
    IpDetailLayout
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Danh sách thanh toán bảo hiểm',
      breadcrumbs: [
        { title: 'Đợt thanh toán', href: '/insurance-payment' },
        { title: 'Danh sách thanh toán bảo hiểm', href: '' }
      ]
    }
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
