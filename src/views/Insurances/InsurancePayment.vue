<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <insurance-payment-layout></insurance-payment-layout>
    </template>
  </home-layout>
</template>

<script>
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout";
import InsurancePaymentLayout from "../../components/Insurances/InsurancePaymentLayout";

export default {
  name: "InsurancePayment",
  extends: MasterView,
  components: {
    HomeLayout,
    InsurancePaymentLayout
  },
  data() {
    return {
        headerTitle: "Thanh toán bảo hiểm",
        breadcrumbs: [{ title: "Thanh toán bảo hiểm", href: "" }],
    };
  },
  methods: {
    inital() {
      this.sleep(500).then(() => {
        this.init();
      });
      this.fadeOut();
    }
  },
  mounted() {
    this.inital();
  }
}
</script>

<style lang="sass" scoped>
</style>
