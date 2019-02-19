<template>
  <div id="language-modal" ref="add_modal" class="modal fade show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isCreate ? createTitle : updateTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 mt-12">
              <div class="card">
                <div class="card-body">
                  <el-form>
                    <div class="form-group">
                      <label for="kni">{{ $t('lang.title') }}</label>
                      <el-drag-select v-model="user_language.lang_id" :placeholder="$t('lang.select')">
                        <el-option v-for="(lang, index) in languages" :label="lang.title" :value="lang.id" :key="index" />
                      </el-drag-select>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('lang.listen') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_language.listen" :placeholder="$t('lang.listen')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('lang.speak') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_language.speak" :placeholder="$t('lang.speak')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('lang.read') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_language.read" :placeholder="$t('lang.read')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <label>{{ $t('lang.write') }}</label>
                      <el-form-item>
                        <el-input :rows="1" v-model="user_language.write" :placeholder="$t('lang.write')" type="text" class="article-textarea"/>
                      </el-form-item>
                    </div>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
                    </div>
                    <button :disabled="isDisable" type="submit" class="btn btn-primary mt-4 pr-4 pl-4" @click="storeOrUpdate">
                      <i class="ti-save"/> {{ isCreate ? btnCreate : btnUpdate }}
                    </button>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import MasterView from '@/views/MasterView'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'LanguageModal',
  components: {
    ElDragSelect
  },
  extends: MasterView,
  props: {
    empId: {
      type: Number,
      default: 0
    },
    eLanguage: {
      type: Object,
      default: () => {}
    },
    isCreate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      createTitle: this.$t('lang.add_title'),
      updateTitle: this.$t('lang.update_title'),
      btnCreate: this.$t('button.save'),
      btnUpdate: this.$t('button.update'),
      languages: this.$store.getters.languages,
      user_language: {
        lang_id: '',
        listen: '',
        speak: '',
        read: '',
        write: '',
        emp_id: this.empId,
        id: ''
      },
      isDisable: false,
      errors: [],
      modal_id: 'language-modal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    init() {
      this.user_language = this.eLanguage
    },
    storeOrUpdate(e) {
      e.preventDefault()
      this.isDisable = true
      const keyNullable = ['id']
      _.forEach(this.user_language, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) {
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` })
        }
      })
      if (this.errors.length) {
        this.isDisable = false
        return
      }
      if (!this.isCreate) {
        return rf
          .getRequest('UserLanguagesRequest')
          .update(this.user_language)
          .then(res => {
            if (res.status) {
              this.emitEvent('update-eLanguage', res.data.data)
            }
          })
      }
      rf.getRequest('UserLanguagesRequest')
        .store(this.user_language)
        .then(res => {
          if (res.status) {
            this.emitEvent('add-eLanguage', res.data.data)
          }
        })
    },
    clearData() {
      this.user_language = this.emptyData(this.user_language)
      this.isDisable = false
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
