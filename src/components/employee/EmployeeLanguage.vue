<template>
  <div class="card">
    <div class="card-body">
      <div class="epm-tb-header">
        <h4 class="header-title header-underline">Ngôn ngữ</h4>
      </div>
      <data-table ref="datatable" :get-data="getELanguages">
        <template slot="head">
          <th>Tên Nhân viên</th>
          <th>Ngôn ngữ</th>
          <th>Trình độ nghe</th>
          <th>Trình độ nói</th>
          <th>Trình độ đọc</th>
          <th>Trình độ viết</th>
          <th>Thao tác</th>
        </template>
        <template slot="body" slot-scope="props">
          <tr>
            <td
              v-if="(!props.index || props.data[props.index].name !== props.data[props.index-1].name)"
              :rowspan="props.item.employee.count_lang"
              v-text="props.item.name"/>
            <td v-text="props.item.language" />
            <td v-text="props.item.listen" />
            <td v-text="props.item.speak"/>
            <td v-text="props.item.read"/>
            <td v-text="props.item.write"/>
            <td>
              <button class="btn btn-del" type="button" tooltip="Delete" @click="removeLanguage(props.item)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="btn btn-edit" type="button" tooltip="Edit" @click="showModalUpdate(props.item)">
                <svg-icon icon-class="edit" />
              </button>
              <button class="btn btn-add" type="button" tooltip="Edit" @click="addLanguage(props.item)">
                <svg-icon icon-class="plus-square"/>
              </button>
            </td>
          </tr>
        </template>
      </data-table>
      <language-modal v-if="isShow" :language="user_language" :is-create="isCreate" :emp-id="empId"/>
    </div>
  </div>
</template>

<script>
import rf from '../../requests/RequestFactory'
import DataTable from '../commons/DataTable'
import MasterView from '@/views/MasterView'
import LanguageModal from '../commons/EmployeeModal/LanguageModal'

export default {
  name: 'EmployeeLanguage',
  components: {
    DataTable,
    LanguageModal
  },
  extends: MasterView,
  data() {
    return {
      user_language: {
        lang_id: '',
        listen: '',
        speak: '',
        read: '',
        write: '',
        emp_id: '',
        id: ''
      },
      isCreate: true,
      isShow: false,
      empId: 0,
      modal_id: 'language-modal'
    }
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getELanguages() {
      return rf.getRequest('UserLanguagesRequest').getAll()
    },
    addLanguage(lang) {
      this.user_language.emp_id = lang.emp_id
      this.empId = lang.emp_id
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(certification) {
      this.isCreate = false
      Object.assign(
        this.user_language,
        this.setData(this.user_language, certification)
      )
      this.isShow = true
      this.addEventShowModal()
    },
    removeLanguage(lang) {
      if (confirm('Bạn có chắc muốn xóa ngôn ngữ này?')) {
        rf.getRequest('UserLanguagesRequest')
          .destroy({ id: lang.id })
          .then(res => {
            if (res.status) {
              window.EventBus.$emit('delete-eLanguage', lang)
            }
          })
      }
    },
    clearData() {
      this.user_language = this.emptyData(this.user_language)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
      this.isShow = false
    },
    onListener() {
      window.EventBus.$on('add-eLanguage', () => this.tableRefresh())
      window.EventBus.$on('update-eLanguage', () => this.tableRefresh())
      window.EventBus.$on('delete-eLanguage', () => this.tableRefresh())
    }
  }
}
</script>

<style lang="sass" scoped>
.header-title
  font-size: 24px
table
  tr
    th
      text-align: left
    td
      text-align: left
      padding-left: 20px !important
.epm-tb-header
  margin: 20px auto
</style>
