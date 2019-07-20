<template>
  <insurance-payment-layout/>
</template>

<script>
import MasterView from '@/views/MasterView.vue'
import InsurancePaymentLayout from '@/components/Insurances/InsurancePaymentLayout'

export default {
  name: 'InsurancePayment',
  components: {
    InsurancePaymentLayout
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
