<template>
  <div class="modal fade show" id="recruitment-modal">
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
                      <label for="detail-kni">Tên đợt tuyển dụng</label>
                      <input type="text" v-model="recruit.name" class="form-control" placeholder="Tên đợt tuyển dụng" />
                    </div>
                    <date-picker :title="startedAt" v-model="recruit.started_at" :default="getDate(recruit.started_at)" v-if="delay"></date-picker>
                    <date-picker :title="endedAt" v-model="recruit.ended_at" :default="getDate(recruit.started_at)" v-if="delay"></date-picker>
                    <date-picker :title="expiredAt" v-model="recruit.expired_at" :default="getDate(recruit.expired_at)" v-if="delay"></date-picker>
                    <div class="form-group">
                      <label for="detail-kni">Số lượng</label>
                      <input type="number" v-model="recruit.num" class="form-control" placeholder="Số lương nhân viên tuyển trong đợt" />
                    </div>
                    <div class="form-group">
                      <label for="kni">Trạng thái</label>
                      <select v-model="recruit.status" class="form-control">
                        <option value="">Chọn trạng thái</option>
                        <option v-for="(s, index) in status"
                          :key="index"
                          :value="s"
                          v-text="s"/>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="detail-kni">Thông tin của đợt tuyển dụng</label>
                      <textarea v-model="recruit.recruitment_required" class="form-control" placeholder="Thông tin đợt tuyển dụng"/>
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
      createTitle: "Thêm mới",
      updateTitle: "Chỉnh sửa",
      btnCreate: "Lưu",
      btnUpdate: "Cập nhập",
      recruit: {
        name: "",
        started_at: "",
        ended_at: "",
        status: "",
        expired_at: "",
        num: "",
        recruitment_required: "",
        id: ""
      },
      startedAt: "Bắt đầu từ ngày",
      endedAt: "Ngày hết thúc",
      expiredAt: "Hạn nộp hồ sơ",
      isDisable: false,
      emps: {},
      errors: [],
      modal_id: "recruitment-modal",
      delay: false,
      jobs: {},
      status: [
        "Đang triển khai",
        "Đã hoàn thành"
      ]
    };
  },
  props: {
    recruitment: {
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
    init() {
      this.recruit = this.recruitment;
      this.delay = true;
    },
    storeOrUpdate(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id", "recruitment_required"];
      _.forEach(this.recruit, (val, key) => {
        let i = 0;
        if (!i) this.errors = [];
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        i++;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (!this.isCreate) {
        return rf
          .getRequest("RecruitmentRequest")
          .update({ data: this.recruit })
          .then(res => {
            if (res.status) {
              this.emitEvent("update-recruitment", res.data);
            }
          });
      }
      rf.getRequest("RecruitmentRequest")
        .store({ data: this.recruit })
        .then(res => {
          if (res.status) {
            this.emitEvent("add-recruitment", res.data);
          }
        });
    },
    clearData() {
      this.recruit = this.emptyData(this.recruit);
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
