<template>
  <div class="modal fade show" id="insurance-modal">
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
                      <select v-model="insurance.emp_id" id="kni" class="form-control">
                        <option value="">Lựa chọn nhân viên</option>
                        <option v-for="(e, index) in emps"
                          :key="index"
                          :value="e.id"
                          v-text="e.name"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Số sổ BHXH</label>
                      <textarea type="text" v-model="insurance.num_social_security" class="form-control" id="detail-kni" placeholder="Số sổ BHXH" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Số thẻ BHYT</label>
                      <textarea type="text" v-model="insurance.num_health_insurance" class="form-control" id="detail-kni" placeholder="Số thẻ BHYT" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Nơi đăng kí KCB</label>
                      <textarea type="text" v-model="insurance.place_registration_medical" class="form-control" id="detail-kni" placeholder="Nơi đăng kí KCB" />
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Mức đóng</label>
                      <textarea type="text" v-model="insurance.salary_paid" class="form-control" id="detail-kni" placeholder="Mức đóng ..." />
                    </div>
                    <date-picker :title="startedAt" v-model="insurance.started_at" :default="getDate(insurance.started_at)" v-if="delay"></date-picker>
                    <div class="form-group">
                      <label for="kni">Trạng thái</label>
                      <select v-model="insurance.status" id="kni" class="form-control">
                        <option value="">Chọn trạng thái</option>
                        <option v-for="(s, index) in status"
                          :key="index"
                          :value="s"
                          v-text="s"/>
                      </select>
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
import DatePicker from "../DatePicker";
import _ from "lodash";

export default {
  name: "InsuranceModal",
  extends: MasterView,
  components: {
    DatePicker
  },
  data() {
    return {
      createTitle: "Thêm mới bảo biểm",
      updateTitle: "Chỉnh sửả bảo hiểm",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      insurance: {
        emp_id: "",
        num_social_security: "",
        num_health_insurance: "",
        place_registration_medical: "",
        salary_paid: "",
        started_at: "",
        status: "",
        id: ""
      },
      startedAt: "Bắt đầu từ ngày",
      isDisable: false,
      emps: {},
      errors: [],
      modal_id: "insurance-modal",
      status: [
        "Đang tham gia",
        "Giảm tạm thời",
        "Giảm hẳn"
      ],
      delay: false
    };
  },
  props: {
    propInsurance: {
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
    getEmployees() {
      rf.getRequest('EmployeeRequest')
        .getAll()
        .then(res => (this.emps = res));
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    init() {
      this.insurance = this.propInsurance;
      this.getEmployees();
      this.delay = true;
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.insurance, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("InsuranceRequest")
          .update({ data: this.insurance })
          .then(res => {
            if (res.status) {
              this.emitEvent("update-eInsurance", res.data);
            }
          });
      }
      rf.getRequest("InsuranceRequest")
        .store({ data: this.insurance })
        .then(res => {
          if (res.status) {
            this.emitEvent("add-eInsurance", res.data);
          }
        });
    },
    clearData() {
      this.insurance = this.emptyData(this.insurance);
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
