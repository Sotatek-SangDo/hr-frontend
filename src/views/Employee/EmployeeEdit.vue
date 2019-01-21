<template>
  <home-layout :breadcrumbs="breadcrumbs" :header-title="headerTitle">
    <template slot="main-content">
      <add-employee :is-create="isCreate"></add-employee>
    </template>
  </home-layout>
</template>

<script>
import HomeLayout from "../../components/HomeLayout";
import MasterView from "../MasterView";
import AddEmployee from "../../components/employee/AddEmployee";

export default {
  name: "EmployeeEdit",
  extends: MasterView,
  data() {
    return {
      headerTitle: "Chỉnh sửa thông tin",
      breadcrumbs: [{ title: "Chỉnh sửa thông tin", href: "" }],
      isCreate: false
    };
  },
  components: {
    HomeLayout,
    AddEmployee
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
