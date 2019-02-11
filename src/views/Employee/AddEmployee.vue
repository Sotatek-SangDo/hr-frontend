<!-- <template> -->
  <template slot="main-content">
    <add-employee :is-create="isCreate"/>
  </template>
<!-- </template> -->

<script>
// import HomeLayout from '../../components/HomeLayout'
import AddEmployee from '../../components/employee/AddEmployee'

export default {
  name: 'EmployeeAdd',
  components: {
    // HomeLayout,
    AddEmployee
  },
  data() {
    return {
      headerTitle: 'Thêm mới',
      breadcrumbs: [{ title: 'Thêm mới', href: '' }],
      isCreate: true
    }
  },
  mounted() {
    this.inital()
  },
  methods: {
    inital() {
      // this.sleep(500).then(() => {
      //   this.init()
      // })
      // this.fadeOut()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
