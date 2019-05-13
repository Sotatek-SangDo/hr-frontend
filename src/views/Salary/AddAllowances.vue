<template>
  <add-allowance-layout :header="header" :allowance-id="allowanceId"/>
</template>

<script>
import AddAllowanceLayout from '@/components/salary/AddAllowances'

export default {
  name: 'AddAllowance',
  components: {
    AddAllowanceLayout
  },
  data() {
    return {
      header: this.$t('allowance.add'),
      allowanceId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.allowanceId = route.split('/')[3]
    this.header = this.$t('allowance.edit')
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
