<template>
  <recruitment-detail-layout :detail-id="detailId"/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import RecruitmentDetailLayout from '@/components/Recruitment/RecruitmentDetailLayout'

export default {
  name: 'RecruitmentDetail',
  components: {
    RecruitmentDetailLayout
  },
  extends: MasterView,
  data() {
    return {
      detailId: ''
    }
  },
  created() {
    const path = this.$route.path
    this.detailId = path.split('/')[3]
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
