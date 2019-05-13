<template>
  <edit-salary-layout :header="header" :salary-id="salaryId"/>
</template>

<script>
import EditSalaryLayout from '@/components/salary/EditSalary'

export default {
  name: 'EditSalary',
  components: {
    EditSalaryLayout
  },
  data() {
    return {
      header: this.$t('salary.add'),
      salaryId: ''
    }
  },
  created() {
    const route = this.$route.path
    if (route.length < 4) return
    this.salaryId = route.split('/')[3]
    this.header = this.$t('salary.edit')
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
