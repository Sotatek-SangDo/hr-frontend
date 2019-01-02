<template>
  <div class="modal fade show" ref="add_modal" id="language-modal">
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
                  <form @submit.prevent="storeOrUpdate">
                    <div class="form-group">
                      <label for="kni">Ngôn ngữ</label>
                      <select v-model="user_language.lang_id" id="kni" class="form-control">
                        <option value="">Lựa chọn Language</option>
                        <option v-for="(lang, index) in languages"
                          :key="index"
                          :value="lang.id"
                          v-text="lang.title"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Trình độ nghe:</label>
                      <input type="text" v-model="user_language.listen" class="form-control" id="detail-kni" placeholder="Trình độ nghe">
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Trình độ nói:</label>
                      <input type="text" v-model="user_language.speak" class="form-control" id="detail-kni" placeholder="Trình độ nói">
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Trình độ đọc:</label>
                      <input type="text" v-model="user_language.read" class="form-control" id="detail-kni" placeholder="Trình độ đọc">
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Trình độ viết</label>
                      <input type="text" v-model="user_language.write" class="form-control" id="detail-kni" placeholder="Trình độ viết">
                    </div>
                    <div v-if="hasErrors()" class="errors">
                      <span v-text="errors[0].keys"/>
                    </div>
                    <button type="submit" :disabled="isDisable" class="btn btn-primary mt-4 pr-4 pl-4">
                      <i class="ti-save"></i> {{ isCreate ? btnCreate : btnUpdate }}
                    </button>
                  </form>
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
import rf from "../../../requests/RequestFactory";
import MasterView from "../../../views/MasterView";
import _ from "lodash";

export default {
  name: "LanguageModal",
  extends: MasterView,
  data() {
    return {
      createTitle: "Thêm mới kỹ năng",
      updateTitle: "Chỉnh sửả kỹ năng",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      languages: {},
      user_language: {
        lang_id: "",
        listen: "",
        speak: "",
        read: "",
        write: "",
        emp_id: this.empId,
        id: ""
      },
      isDisable: false,
      errors: [],
      modal_id: "language-modal"
    };
  },
  props: {
    empId: {
      type: Number
    },
    eLanguage: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  methods: {
    getLanguages() {
      rf.getRequest("LanguagesRequest")
        .getAll()
        .then(res => {
          this.languages = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    init() {
      this.user_language = this.eLanguage;
      this.getLanguages();
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_language, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1) {
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        }
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("UserLanguagesRequest")
          .update({ data: this.user_language })
          .then(res => {
            if (res.status) {
              this.emitEvent("update-eLanguage", res.data);
            }
          });
      }
      rf.getRequest("UserLanguagesRequest")
        .store({ data: this.user_language })
        .then(res => {
          if (res.status) {
            this.emitEvent("add-eLanguage", res.data);
          }
        });
    },
    clearData() {
      this.user_language = this.emptyData(this.user_language);
      this.isDisable = false;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="sass" scoped>
</style>
