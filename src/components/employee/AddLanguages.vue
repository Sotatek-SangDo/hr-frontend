<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-language">
          <span class="icon"><i class="ti-plus"></i></span>Languages
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userLanguages">
          <div class="list-group-item sub-tab-item" v-for="(lang, i) in userLanguages" :key="i">
            <h5 class="list-group-item-heading">{{ lang.title }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeLang(lang)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(lang)">
                <i class="ti-marker-alt"></i>
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
    <div class="modal fade show" ref="add_modal" id="add-language">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới ngôn ngữ</h5>
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mt-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit.prevent="store">
                      <div class="form-group">
                        <label for="kni">Language</label>
                        <select v-model="user_languages.lang_id" id="kni" class="form-control">
                          <option value="">Lựa chọn Language</option>
                          <option v-for="(lang, index) in languages"
                            :key="index"
                            :value="lang.id"
                            v-text="lang.title"/>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Listen</label>
                        <input type="text" v-model="user_languages.listen" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Speak</label>
                        <input type="text" v-model="user_languages.speak" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Read</label>
                        <input type="text" v-model="user_languages.read" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Write</label>
                        <input type="text" v-model="user_languages.write" class="form-control" id="detail-kni" placeholder="institute">
                      </div>
                      <div v-if="hasErrors()" class="errors">
                        <span v-text="errors[0].keys"/>
                      </div>
                      <button type="submit" :disabled="isDisable" class="btn btn-primary mt-4 pr-4 pl-4"><i class="ti-save"></i> Lưu</button>
                    </form>
                  </div>
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
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import $ from "jquery";
import _ from "lodash";

export default {
  name: "AddEducations",
  extends: MasterView,
  data() {
    return {
      languages: {},
      user_languages: {
        lang_id: "",
        listen: "",
        speak: "",
        read: "",
        write: "",
        emp_id: this.empId,
        id: ""
      },
      errors: [],
      isDisable: false,
      userLanguages: []
    };
  },
  props: {
    empId: {
      type: Number
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
    getUserLanguages() {
      const param = {
        emp_id: this.empId
      };

      rf.getRequest("UserLanguagesRequest")
        .getAll(param)
        .then(res => {
          this.userLanguages = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_languages, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        this.isDisable = false;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (this.user_languages.id) {
        return rf
          .getRequest("UserLanguagesRequest")
          .update(this.user_languages)
          .then(res => {
            if (res.status) {
              this.clearData();
              $(this.$refs.add_modal).modal("hide");
              this.getUserLanguages();
            }
          });
      }
      rf.getRequest("UserLanguagesRequest")
        .store(this.user_languages)
        .then(res => {
          if (res.status) {
            this.clearData();
            $(this.$refs.add_modal).modal("hide");
            this.getUserLanguages();
          }
        });
    },
    showModalUpdate(lang) {
      this.user_languages.lang_id = lang.lang_id;
      this.user_languages.listen = lang.listen;
      this.user_languages.speak = lang.speak;
      this.user_languages.read = lang.read;
      this.user_languages.write = lang.write;
      this.user_languages.id = lang.id;
      $(this.$refs.add_modal).modal("show");
    },
    removeLang(lang) {
      rf.getRequest("UserLanguagesRequest")
        .destroy({ id: lang.id })
        .then(res => {
          if (res.status) {
            this.getUserLanguages();
          }
        });
    },
    clearData() {
      this.user_languages.lang_id = "";
      this.user_languages.listen = "";
      this.user_languages.speak = "";
      this.user_languages.read = "";
      this.user_languages.write = "";
      this.user_languages.id = "";
      this.isDisable = false;
    },
    init() {
      this.getLanguages();
      this.getUserLanguages();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="sass">
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
