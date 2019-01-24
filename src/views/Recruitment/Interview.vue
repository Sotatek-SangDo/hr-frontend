<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <interview-layout/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import InterviewLayout from '../../components/Recruitment/InterviewLayout'

export default {
  name: 'Interview',
  components: {
    HomeLayout,
    InterviewLayout
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Phỏng vấn',
      breadcrumbs: [{ title: 'Phỏng vấn', href: '' }]
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
