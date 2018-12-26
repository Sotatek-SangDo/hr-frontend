<template>
  <div class="modal fade show" id="skill-modal">
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
                      <textarea type="text" v-model="user_skill.detail" class="form-control" id="detail-kni" placeholder="Thông tin chi tiết" />
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
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import _ from "lodash";

export default {
  name: "SkillModal",
  extends: MasterView,
  data() {
    return {
      createTitle: "Thêm mới kỹ năng",
      updateTitle: "Chỉnh sửả kỹ năng",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      user_skill: {
        skill_id: "",
        detail: "",
        emp_id: this.empId,
        id: ""
      },
      isDisable: false,
      skills: {},
      errors: {}
    };
  },
  props: {
    empId: {
      type: Number
    },
    skill: {
      type: Object
    },
    isCreate: {
      type: Boolean
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
    init() {
      this.user_skill = this.skill;
      this.getSkill();
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_skill, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("SkillUserRequest")
          .update(this.user_skill)
          .then(res => {
            if (res.status) {
              this.clearData();
              window.EventBus.$emit("update-eskill", res.data);
              this.hideModal("skill-modal");
            }
          });
      }
      rf.getRequest("SkillUserRequest")
        .store(this.user_skill)
        .then(res => {
          if (res.status) {
            this.clearData();
            this.hideModal("skill-modal");
            window.EventBus.$emit("add-eskill", res.data);
          }
        });
    },
    clearData() {
      this.user_skill.skill_id = "";
      this.user_skill.detail = "";
      this.user_skill.id = "";
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
