<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" @click="addSkill">
          <span class="icon"><i class="ti-plus"></i></span>Kỹ Năng
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userSkills">
          <div class="list-group-item sub-tab-item" v-for="(s, i) in userSkills" :key="i">
            <h5 class="list-group-item-heading">{{ s.skill}}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeSkill(s)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(s)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">{{ s.detail }}</p>
          </div>
        </div>
      </div>
    </div>
    <skill-modal :skill="user_skill" :is-create="isCreate" :emp-id="empId" v-show="isShow"></skill-modal>
  </div>
</template>

<script>
import rf from "../../requests/RequestFactory";
import MasterView from "../../views/MasterView";
import SkillModal from "../commons/SkillModal";
import $ from "jquery";

export default {
  name: "AddSkill",
  extends: MasterView,
  components: {
    SkillModal
  },
  data() {
    return {
      user_skill: {
        skill_id: "",
        detail: "",
        emp_id: this.empId,
        id: ""
      },
      isCreate: true,
      isShow: false,
      userSkills: []
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getUserSkill() {
      rf.getRequest("SkillUserRequest")
        .getEmpSkill({ id: this.empId })
        .then(res => (this.userSkills = res));
    },
    addSkill(e) {
      e.preventDefault();
      this.isCreate = true;
      this.isShow = true;
      this.showModal("skill-modal");
    },
    showModalUpdate(skill) {
      this.show = false;
      this.isCreate = false;
      this.user_skill.skill_id = skill.skill_id;
      this.user_skill.detail = skill.detail;
      this.user_skill.id = skill.id;
      this.show = true;
      this.showModal("skill-modal");
    },
    removeSkill(skill) {
      if (confirm("Bạn có chắc muốn xóa kỹ năng này")) {
        rf.getRequest("SkillUserRequest")
          .destroy({ id: skill.id })
          .then(res => {
            if (res.status) {
              this.userSkills.splice(this.userSkills.indexOf(skill), 1);
            }
          });
      }
    },
    clearData() {
      this.user_skill.skill_id = "";
      this.user_skill.detail = "";
      this.user_skill.id = "";
    },
    init() {
      this.getUserSkill();
      $("#skill-modal").on(
        "hidden.bs.modal",
        function() {
          this.clearData();
        }.bind(this)
      );
      this.onEventSkill();
    },
    onEventSkill() {
      window.EventBus.$on("update-eskill", eskill => {
        const index = this.userSkills.findIndex(s => s.id === eskill.id);
        this.userSkills[index] = eskill;
        this.$forceUpdate();
      });
      window.EventBus.$on("add-eskill", eskill => {
        this.userSkills.push(eskill);
      });
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
