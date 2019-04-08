<template>
  <employee-reference :columns="columnEdus" :data="lang"/>
</template>
<script>
import EmployeeReference from '@/components/employee/EmployeeReference'

export default {
  name: 'EmployeeReferenceLang',
  components: {
    EmployeeReference
  },
  props: {
    lang: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnEdus: [
        {
          'label': this.$t('lang.title'),
          'field': 'language'
        },
        {
          'label': this.$t('lang.listen'),
          'field': 'listen'
        },
        {
          'label': this.$t('lang.read'),
          'field': 'read'
        },
        {
          'label': this.$t('lang.write'),
          'field': 'write'
        },
        {
          'label': this.$t('lang.speak'),
          'field': 'speak'
        }
      ]
    }
  }
}
</script>
