<template>
  <div id="accordion6" class="according gradiant-bg">
    <div class="card">
      <div class="card-header">
        <a href="#" class="card-link icon-p" data-toggle="modal" data-target="#add-contact">
          <span class="icon"><i class="ti-plus"></i></span>Emergency Contacts
        </a>
      </div>
      <div class="collapse show" data-parent="#accordion6">
        <div class="card-body" v-if="userContacts">
          <div class="list-group-item sub-tab-item" v-for="(con, i) in userContacts" :key="i">
            <h5 class="list-group-item-heading">{{ con.full_name }}
              <button class="but but-del" type="button" tooltip="Delete" @click="removeContact(con)">
                <i class="ti-trash"></i>
              </button>
              <button class="but but-edit" type="button" tooltip="Edit" @click="showModalUpdate(con)">
                <i class="ti-marker-alt"></i>
              </button>
            </h5>
            <p class="list-group-item-text">Relationship: {{ con.relationship }}</p>
            <p class="list-group-item-text">Contact phone: {{ con.contact_phone }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade show" ref="add_modal" id="add-contact">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thêm mới contact</h5>
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
                        <input type="text" v-model="user_contacts.full_name" class="form-control" id="detail-kni" placeholder="Full Name">
                      </div>
                      <div class="form-group">
                        <label for="detail-kni">Relationship:</label>
                        <input type="text" v-model="user_contacts.relationship" class="form-control" id="detail-kni" placeholder="Relationship">
                      </div>
                      <div class="form-gruop">
                        <label for="">Contact Phone:</label>
                        <input type="text" v-model="user_contacts.contact_phone" class="form-control"
                        placeholder="Contact Phone">
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
  name: "AddEmergencyContact",
  extends: MasterView,
  data() {
    return {
      user_contacts: {
        full_name: "",
        relationship: "",
        contact_phone: "",
        emp_id: this.empId,
        id: ""
      },
      errors: [],
      isDisable: false,
      userContacts: []
    };
  },
  props: {
    empId: {
      type: Number
    }
  },
  methods: {
    getEmergencyContacts() {
      const param = {
        emp_id: this.empId
      };

      rf.getRequest("EmergencyContactsRequest")
        .getAll(param)
        .then(res => {
          this.userContacts = res;
        });
    },
    hasErrors() {
      return !_.isEmpty(this.errors);
    },
    store(e) {
      e.preventDefault();
      this.isDisable = true;
      const keyNullable = ["id"];
      _.forEach(this.user_contacts, (val, key) => {
        if (!val && keyNullable.indexOf(key) === -1)
          this.errors.push({ keys: `${key} yêu cầu, không được rỗng.` });
        this.isDisable = false;
      });
      if (this.errors.length) {
        this.isDisable = false;
        return;
      }
      if (this.user_contacts.id) {
        return rf
          .getRequest("EmergencyContactsRequest")
          .update(this.user_contacts)
          .then(res => {
            if (res.status) {
              this.clearData();
              $(this.$refs.add_modal).modal("hide");
              this.getEmergencyContacts();
            }
          });
      }
      rf.getRequest("EmergencyContactsRequest")
        .store(this.user_contacts)
        .then(res => {
          if (res.status) {
            this.clearData();
            $(this.$refs.add_modal).modal("hide");
            this.getEmergencyContacts();
          }
        });
    },
    showModalUpdate(emergency) {
      this.user_contacts.full_name = emergency.full_name;
      this.user_contacts.relationship = emergency.relationship;
      this.user_contacts.contact_phone = emergency.contact_phone;
      this.user_contacts.id = emergency.id;
      $(this.$refs.add_modal).modal("show");
    },
    removeContact(emergency) {
      rf.getRequest("EmergencyContactsRequest")
        .destroy({ id: emergency.id })
        .then(res => {
          if (res.status) {
            this.getEmergencyContacts();
          }
        });
    },
    clearData() {
      this.user_contacts.full_name = "";
      this.user_contacts.relationship = "";
      this.user_contacts.contact_phone = "";
      this.user_contacts.id = "";
      this.isDisable = false;
    },
    init() {
      this.getEmergencyContacts();
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
