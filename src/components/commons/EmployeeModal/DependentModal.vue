<template>
  <div class="modal fade show" ref="add_modal" id="dependent-modal">
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
                      <label for="detail-kni">Họ và tên:</label>
                      <input type="text" v-model="user_dependent.full_name" class="form-control" id="detail-kni" placeholder="Full Name">
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Mối quan hệ:</label>
                      <input type="text" v-model="user_dependent.relationship" class="form-control" id="detail-kni" placeholder="Relationship">
                    </div>
                    <date-picker :title="birthDay" v-model="user_dependent.birthday" :default="getDate(user_dependent.birthday)" v-if="delay"></date-picker>
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
import DatePicker from "../../commons/DatePicker";
import _ from "lodash";

export default {
  name: "DependentModal",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      createTitle: "Thêm người phụ thuộc",
      updateTitle: "Chỉnh sửa",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      user_dependent: {
        full_name: "",
        relationship: "",
        birthday: "",
        emp_id: "",
        id: ""
      },
      modal_id: "dependent-modal",
      birthDay: "Ngày sinh",
      errors: [],
      isDisable: false,
      delay: false
    };
  },
  props: {
    empId: {
      type: Number
    },
    dependent: {
      type: Object
    },
    isCreate: {
      type: Boolean
    }
  },
  methods: {
    getDate(date) {
      return date ? new Date(date) : new Date();
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      this.errors = [];
      _.forEach(this.user_dependent, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
      });
      if (this.hasErrors()) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("DependentsRequest")
          .update({ data: this.user_dependent })
          .then(res => {
            if (res.status) {
              this.emitEvent("update-eDependent", res.data);
            }
          });
      }
      rf.getRequest("DependentsRequest")
        .store({ data: this.user_dependent })
        .then(res => {
          if (res.status) {
            this.emitEvent("add-eDependent", res.data);
          }
        });
    },
    clearData() {
      this.user_dependent = this.emptyData(this.user_dependent);
      this.isDisable = false;
    },
    init() {
      this.user_dependent = this.dependent;
      this.delay = true;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="sass" scoped>
</style>
