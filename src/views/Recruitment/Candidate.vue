<template>
  <recruitment-detail-layout/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import RecruitmentDetailLayout from '@/components/Recruitment/RecruitmentDetailLayout'

export default {
  name: 'Cadidate',
  components: {
    RecruitmentDetailLayout
  },
  extends: MasterView,
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
