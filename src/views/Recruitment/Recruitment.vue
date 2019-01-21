<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <recruitment-layout></recruitment-layout>
    </template>
  </home-layout>
</template>

<script>
import MasterView from "../MasterView.vue";
import HomeLayout from "../../components/HomeLayout";
import RecruitmentLayout from "../../components/Recruitment/RecruitmentLayout";

export default {
  name: "Recruitment",
  extends: MasterView,
  components: {
    HomeLayout,
    RecruitmentLayout
  },
  data() {
    return {
        headerTitle: "Đợt tuyển dụng",
        breadcrumbs: [{ title: "Đợt tuyển dụng", href: "" }],
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
