<template>
  <ip-detail-layout :detail-id="id"/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import IpDetailLayout from '@/components/Insurances/IPDetailLayout'

export default {
  name: 'IPDetail',
  components: {
    IpDetailLayout
  },
  extends: MasterView,
  data() {
    return {
      id: ''
    }
  },
  created() {
    const route = this.$route.path
    this.id = route.split('/')[3]
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
