<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addLanguage">
          <span class="icon"><svg-icon icon-class="plus-square"/></span>Ngôn ngữ
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div v-if="userLanguages" class="card-body">
          <div v-for="(lang, i) in userLanguages" :key="i" class="list-group-item sub-tab-item">
            <h5 class="list-group-item-heading" style="text-transform: uppercase">{{ lang.language }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeLang(lang)">
                <svg-icon icon-class="rubbish-bin" />
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(lang)">
                <svg-icon icon-class="edit" />
              </button>
            </h5>
            <p class="list-group-item-text">Listen: {{ lang.listen }}</p>
            <p class="list-group-item-text">Speak: {{ lang.speak }}</p>
            <p class="list-group-item-text">Read: {{ lang.read }}</p>
            <p class="list-group-item-text">Write: {{ lang.write }}</p>
          </div>
        </div>
      </div>
    </div>
    <language-modal v-if="isShow" :emp-id="empId" :e-language="user_language" :is-create="isCreate"/>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import MasterView from '@/views/MasterView'
import LanguageModal from '../commons/EmployeeModal/LanguageModal'

export default {
  name: 'AddEducations',
  components: {
    LanguageModal
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      user_language: {
        lang_id: '',
        listen: '',
        speak: '',
        read: '',
        write: '',
        emp_id: this.empId,
        id: ''
      },
      isCreate: true,
      userLanguages: [],
      isShow: false,
      modal_id: 'language-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getUserLanguages() {
      rf.getRequest('UserLanguagesRequest')
        .getELanguages({ id: this.empId })
        .then(res => {
          this.userLanguages = res.data
        })
    },
    addLanguage(e) {
      e.preventDefault()
      this.isCreate = true
      this.user_language.emp_id = this.empId
      this.isShow = true
      this.addEventShowModal()
    },
    showModalUpdate(lang) {
      this.isCreate = false
      Object.assign(this.user_language, this.setData(this.user_language, lang))
      this.isShow = true
      this.addEventShowModal()
    },
    removeLang(lang) {
      if (confirm('Bạn có chắc muốn xóa ngôn ngữ này khỏi danh sách?')) {
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
    onEventLanguage() {
      window.EventBus.$on('update-eLanguage', eLang => {
        const index = this.userLanguages.findIndex(l => l.id === eLang.id)
        this.userLanguages[index] = eLang
        this.$forceUpdate()
      })
      window.EventBus.$on('add-eLanguage', eLang =>
        this.userLanguages.push(eLang)
      )
      window.EventBus.$on('delete-eLanguage', eLang => {
        const index = this.userLanguages.findIndex(l => l.id === eLang.id)
        this.userLanguages.splice(index, 1)
      })
    },
    init() {
      this.getUserLanguages()
      this.onEventLanguage()
    }
  }
}
</script>

<style lang="sass" scoped>
button::disabled
  cursor: not-allowed
#detail-kni
  resize: none;
.form-group
  margin-bottom: 10px
a.icon-p
  font-weight: 800
  font-size: 22px !important
  span.icon
    background: #fff
    height: 30px
    width: 30px
    display: inline-block
    color: #8148fd
    font-size: 22px
    font-weight: 900
    padding-left: 4px
    margin-right: 30px
.but
  border: 1px solid #bfbfbf
  color: blue
  font-size: 20px
  background-color: transparent
  position: absolute
  top: 0
  padding: 5px
  cursor: pointer
  &.but-del
    right: 0
    border-right: none
    border-left: none
    border-top: none
  &.but-edit
    right: 30px
    border-top: none
    border-radius: 0 0 0 5px
</style>
