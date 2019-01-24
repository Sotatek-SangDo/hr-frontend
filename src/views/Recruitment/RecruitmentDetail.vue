<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <recruitment-detail-layout/>
    </template>
  </home-layout>
</template>

<script>
import MasterView from '../MasterView.vue'
import HomeLayout from '../../components/HomeLayout'
import RecruitmentDetailLayout from '../../components/Recruitment/RecruitmentDetailLayout'

export default {
  name: 'RecruitmentDetail',
  components: {
    HomeLayout,
    RecruitmentDetailLayout
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
