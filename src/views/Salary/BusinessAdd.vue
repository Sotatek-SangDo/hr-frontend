<template>
  <add-business-layout :header="header" :business-id="businessId"/>
</template>

<script>
import AddBusinessLayout from '@/components/salary/AddBusiness'

export default {
  name: 'AddBusiness',
  components: {
    AddBusinessLayout
  },
  data() {
    return {
      header: this.$t('salary_business.edit'),
      businessId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.businessId = route.split('/')[3]
    this.header = this.$t('salary_business.edit')
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
