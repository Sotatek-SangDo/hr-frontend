<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <ip-detail-layout></ip-detail-layout>
    </template>
  </home-layout>
</template>

<script>
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout";
import IpDetailLayout from "../../components/Insurances/IPDetailLayout";

export default {
  name: "IPDetail",
  extends: MasterView,
  components: {
    HomeLayout,
    IpDetailLayout
  },
  data() {
    return {
      headerTitle: "Danh sách thanh toán bảo hiểm",
      breadcrumbs: [
        { title: "Đợt thanh toán", href: "/insurance-payment" },
        { title: "Danh sách thanh toán bảo hiểm", href: "" }
      ]
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
};
</script>

<style lang="sass" scoped>
</style>
