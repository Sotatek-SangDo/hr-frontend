<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-dependents">
          <span class="icon"><i class="ti-plus"></i></span>Dependents
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userDependents">
          <div class="list-group-item sub-tab-item" v-for="(dep, i) in userDependents" :key="i">
            <h5 class="list-group-item-heading">{{ dep.full_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeDep(dep)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(dep)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Relationship: {{ dep.relationship }}</p>
            <p class="list-group-item-text">Birthday: {{ dep.birthday }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade show" ref="add_modal" id="add-dependents">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới quan hệ</h5>
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mt-12">
                <div class="card">
                  <div class="card-body">
                    <form @submit.prevent="store">
                      <div class="form-group">
                        <label for="detail-kni">Full Name:</label>
                        <input type="text" v-model="user_dependents.full_name" class="form-control" id="detail-kni" placeholder="Full Name">
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Relationship:</label>
                        <input type="text" v-model="user_dependents.relationship" class="form-control" id="detail-kni" placeholder="Relationship">
                      </div>
                      <date-picker :title="birthDay" v-model="user_dependents.birthday" :default="getDate(user_dependents.birthday)"></date-picker>
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
import DatePicker from "../commons/DatePicker";
import $ from "jquery";
import _ from "lodash";

export default {
  name: "AddDependenst",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      user_dependents: {
        full_name: "",
        relationship: "",
        birthday: "",
        emp_id: this.empId,
        id: ""
      },
      birthDay: "Birth Day",
      errors: [],
      isDisable: false,
      userDependents: []
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date();
    },
    getDependents() {
      const param = {
        emp_id: this.empId
      };

      rf.getRequest("DependentsRequest")
        .getAll(param)
        .then(res => {
          this.userDependents = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_dependents, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        this.isDisable = false;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (this.user_dependents.id) {
        return rf
          .getRequest("DependentsRequest")
          .update(this.user_dependents)
          .then(res => {
            if (res.status) {
              this.clearData();
              $(this.$refs.add_modal).modal("hide");
              this.getDependents();
            }
          });
      }
      rf.getRequest("DependentsRequest")
        .store(this.user_dependents)
        .then(res => {
          if (res.status) {
            this.clearData();
            $(this.$refs.add_modal).modal("hide");
            this.getDependents();
          }
        });
    },
    showModalUpdate(dependent) {
      this.user_dependents.full_name = dependent.full_name;
      this.user_dependents.relationship = dependent.relationship;
      this.user_dependents.birthday = dependent.birthday;
      this.user_dependents.id = dependent.id;
      $(this.$refs.add_modal).modal("show");
    },
    removeDep(dependent) {
      rf.getRequest("DependentsRequest")
        .destroy({ id: dependent.id })
        .then(res => {
          if (res.status) {
            this.getDependents();
          }
        });
    },
    clearData() {
      this.user_dependents.full_name = "";
      this.user_dependents.relationship = "";
      this.user_dependents.birthday = "";
      this.user_dependents.id = "";
      this.isDisable = false;
    },
    init() {
      this.getDependents();
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
