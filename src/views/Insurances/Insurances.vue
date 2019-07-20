<template>
  <insurance-layout/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import InsuranceLayout from '@/components/Insurances/InsuranceLayout'

export default {
  name: 'Insurances',
  components: {
    InsuranceLayout
  },
  extends: MasterView,
  data() {
    return {
    }
  },
  mounted() {
    this.inital()
  },
  methods: {
    inital() {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
