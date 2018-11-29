<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-skill">
          <span class="icon"><i class="ti-plus"></i></span>Kỹ Năng
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body">
          content
        </div>
      </div>
    </div>
    <div class="modal fade show" id="add-skill">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới kỹ năng</h5>
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mt-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit-prevent="store">
                      <div class="form-group">
                        <label for="kni">Kĩ năng</label>
                        <select v-model="user_skill.skill_id" id="kni" class="form-control">
                          <option value="">Lựa chọn kỹ năng</option>
                          <option v-for="(s, index) in skills"
                            :key="index"
                            :value="s.id"
                            v-text="s.skill_name"/>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Thông tin chi tiết</label>
                        <textarea type="text" v-model="user_skill.detail" class="form-control" id="detail-kni" placeholder="Thông tin chi tiết"></textarea>
                      </div>
                      <div v-if="hasErrors()" class="errors">
                        <span v-text="errors[0].keys"/>
                      </div>
                      <button type="submit" :disabled="isDisable" class="btn btn-primary mt-4 pr-4 pl-4">Lưu</button>
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
import _ from "lodash";

export default {
  name: "AddSkill",
  extends: MasterView,
  data() {
    return {
      skills: {},
      user_skill: {
        skill_id: "",
        detail: "",
        user_id: this.empId
      },
      errors: [],
      isDisable: false
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getSkill() {
      rf.getRequest("SkillRequest")
        .getAll()
        .then(res => (this.skills = res));
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = [];
      _.forEach(this.user_skill, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
      });
      if (this.errors) {
        this.isDisable = false;
        return;
      }
      rf.getRequest("SkillUserRequest")
        .store(this.user_skill)
        .then(res => (this.errors = res));
    },
    init() {
      this.getSkill();
    },
    addSkill() {}
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
</style>
