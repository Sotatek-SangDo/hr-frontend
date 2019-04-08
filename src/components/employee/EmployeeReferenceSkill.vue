<template>
  <employee-reference :columns="columnskill" :data="skills"/>
</template>
<script>
import EmployeeReference from '@/components/employee/EmployeeReference'

export default {
  name: 'EmployeeReferenceSkill',
  components: {
    EmployeeReference
  },
  props: {
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnskill: [
        {
          'label': this.$t('skill.title'),
          'field': 'detail'
        },
        {
          'label': this.$t('skill.detail'),
          'field': 'detail'
        }
      ]
    }
  }
}
</script>
