<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <candidate-layout></candidate-layout>
    </template>
  </home-layout>
</template>

<script>
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout";
import CandidateLayout from "../../components/Recruitment/CandidateLayout";

export default {
  name: "Cadidate",
  extends: MasterView,
  components: {
    HomeLayout,
    CandidateLayout
  },
  data() {
    return {
      headerTitle: "Ứng viên",
      breadcrumbs: [{ title: "Đợt tuyển dụng", href: "" }]
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
