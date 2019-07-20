<template>
  <employee-reference :columns="columnEdus" :data="cers"/>
</template>
<script>
import EmployeeReference from '@/components/employee/EmployeeReference'

export default {
  name: 'EmployeeReferenceCerti',
  components: {
    EmployeeReference
  },
  props: {
    cers: {
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
          'label': this.$t('employee.certification_name'),
          'field': 'certification_name'
        },
        {
          'label': this.$t('cer.grantedOn'),
          'field': 'granted_on'
        },
        {
          'label': this.$t('cer.validTo'),
          'field': 'valid_to'
        }
      ]
    }
  }
}
</script>
