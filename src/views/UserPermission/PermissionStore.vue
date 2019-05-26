<template>
  <add-user :header="header" :user-id="userId"/>
</template>

<script>
import AddUser from '@/components/UserPermission/AddUser'

export default {
  name: 'PermissionStore',
  components: {
    AddUser
  },
  data() {
    return {
      header: this.$t('permissions.add'),
      userId: ''
    }
  },
  created() {
    const route = this.$route.path.split('/')
    if (route.length < 4) return
    this.userId = route[3]
    this.header = this.$t('permissions.edit')
  },
  mounted() {
    console.log(this.$store.getters)
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
