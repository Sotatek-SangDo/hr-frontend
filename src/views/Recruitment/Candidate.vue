<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <candidate-layout/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import CandidateLayout from '../../components/Recruitment/CandidateLayout'

export default {
  name: 'Cadidate',
  components: {
    HomeLayout,
    CandidateLayout
  },
  extends: MasterView,
  data() {
    return {
      headerTitle: 'Ứng viên',
      breadcrumbs: [{ title: 'Đợt tuyển dụng', href: '' }]
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
