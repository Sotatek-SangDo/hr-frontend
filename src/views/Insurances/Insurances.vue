<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <insurance-layout></insurance-layout>
    </template>
  </home-layout>
</template>

<script>
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout";
import InsuranceLayout from "../../components/Insurances/InsuranceLayout";

export default {
  name: "Insurances",
  extends: MasterView,
  components: {
    HomeLayout,
    InsuranceLayout
  },
  data() {
    return {
        headerTitle: "Bảo hiểm",
        breadcrumbs: [{ title: "Bảo hiểm", href: "" }],
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
