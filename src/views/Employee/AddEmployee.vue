<!-- <template> -->
  <template slot="main-content">
    <add-employee :is-create="isCreate"/>
  </template>
<!-- </template> -->

<script>
// import HomeLayout from '../../components/HomeLayout'
import MasterView from '../MasterView'
import AddEmployee from '../../components/employee/AddEmployee'
import store from '@/store'

export default {
  name: 'EmployeeAdd',
  components: {
    // HomeLayout,
    AddEmployee
  },
  extends: MasterView,
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
      this.sleep(500).then(() => {
        this.init()
      })
      this.fadeOut()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
