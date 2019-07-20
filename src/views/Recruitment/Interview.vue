<template>
  <interview-layout/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import InterviewLayout from '@/components/Recruitment/InterviewLayout'

export default {
  name: 'Interview',
  components: {
    InterviewLayout
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
