<template>
  <employee-reference :columns="columnEdus" :data="edus"/>
</template>
<script>
import EmployeeReference from '@/components/employee/EmployeeReference'

export default {
  name: 'EmployeeReferenceEdu',
  components: {
    EmployeeReference
  },
  props: {
    edus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnEdus: [
        {
          'label': this.$t('edu.institute'),
          'field': 'institute'
        },
        {
          'label': this.$t('edu.qualification_name'),
          'field': 'qualification_name'
        },
        {
          'label': this.$t('edu.startedAt'),
          'field': 'started_at'
        },
        {
          'label': this.$t('edu.endedAt'),
          'field': 'ended_at'
        }
      ]
    }
  }
}
</script>
