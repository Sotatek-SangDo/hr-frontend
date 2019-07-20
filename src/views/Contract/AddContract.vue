<template>
  <add-contract-layout :header="header" :contract-id="contractId"/>
</template>

<script>
import AddContractLayout from '@/components/contract/AddContract'

export default {
  name: 'AddContract',
  components: {
    AddContractLayout
  },
  data() {
    return {
      header: this.$t('contract.add'),
      contractId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.contractId = route.split('/')[3]
    this.header = this.$t('contract.edit')
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
