<template>
  <employee-reference :columns="columnEdus" :data="contact"/>
</template>
<script>
import EmployeeReference from '@/components/employee/EmployeeReference'

export default {
  name: 'EmployeeReferenceEC',
  components: {
    EmployeeReference
  },
  props: {
    contact: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnEdus: [
        {
          'label': this.$t('emergency_contact.full_name'),
          'field': 'full_name'
        },
        {
          'label': this.$t('emergency_contact.relation'),
          'field': 'relationship'
        },
        {
          'label': this.$t('emergency_contact.phone_number'),
          'field': 'contact_phone'
        }
      ]
    }
  }
}
</script>
