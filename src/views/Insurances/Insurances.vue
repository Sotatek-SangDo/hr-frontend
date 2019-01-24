<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <insurance-layout/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import InsuranceLayout from '../../components/Insurances/InsuranceLayout'

export default {
  name: 'Insurances',
  components: {
    HomeLayout,
    InsuranceLayout
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Bảo hiểm',
      breadcrumbs: [{ title: 'Bảo hiểm', href: '' }]
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
