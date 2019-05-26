<template>
  <div class="card">
    <div class="card-body">
      <div class="container">
        <h5>{{ header }}</h5>
        <el-form ref="postForm" :model="user" :rules="rules" class="form-container">
          <div class="row">
            <div class="col-xs-4 col-md-4">
              <div class="form-group">
                <label class="col-form-label">{{ $t('permissions.user.firstName') }}</label>
                <el-form-item style="margin-bottom: 30px;" prop="firstName">
                  <el-input :rows="1" v-model="user.firstName" :placeholder="$t('placeholder.user.firstName')" type="text" class="article-textarea"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('permissions.user.lastName') }}</label>
                <el-form-item style="margin-bottom: 30px;" prop="lastName">
                  <el-input :rows="1" v-model="user.lastName" :placeholder="$t('placeholder.user.lastName')" type="text" class="article-textarea"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('permissions.user.email') }}</label>
                <el-form-item style="margin-bottom: 30px;" prop="email">
                  <el-input :rows="1" v-model="user.email" :placeholder="$t('placeholder.user.email')" type="email" class="article-textarea"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('permissions.user.phonenumber') }}</label>
                <el-form-item style="margin-bottom: 30px;" prop="phonenumber">
                  <el-input :rows="1" v-model="user.phonenumber" :placeholder="$t('placeholder.user.phonenumber')" type="text" class="article-textarea"/>
                </el-form-item>
              </div>
              <div class="form-group">
                <label class="col-form-label">{{ $t('permissions.user.role') }}</label>
                <el-drag-select v-model="user.role" :placeholder="$t('placeholder.user.role')">
                  <el-option v-for="(item, index) in roles" :label="item.role" :value="item.role" :key="index" />
                </el-drag-select>
              </div>
            </div>
          </div>
          <div class="errors">
            <span v-if="hasErrors()" v-text="errors[0].keys"/>
            <span v-else/>
          </div>
          <div class="form-group">
            <button :disabled="isDisable" class="btn btn-success mb-3" type="submit" @click="submitForm">
              {{ !userId ? createBtn : updateBtn }}
            </button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import rf from '@/api/commons/RequestFactory'
import _ from 'lodash'
import ElDragSelect from '@/components/DragSelect/select'

export default {
  name: 'AddUser',
  components: {
    ElDragSelect
  },
  props: {
    header: {
      type: String,
      default: ''
    },
    userId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '' || !value) {
        if (rule.field === 'avatar' && this.upload !== this.$t('placeholder.employee_add.avatar')) {
          callback()
        }
        callback(this.handError(rule))
      } else {
        callback()
      }
    }
    return {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        role: ''
      },
      passwordDefault: {
        password: '111111',
        confirmPassword: '111111'
      },
      roles: this.$store.getters.routerRoles,
      isDisable: false,
      errors: [],
      isShow: false,
      createBtn: this.$t('button.save'),
      updateBtn: this.$t('button.update'),
      rules: {
        firstName: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }],
        lastName: [{ validator: validateRequire }],
        role: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
  },
  created() {
    if (this.userId) {
      this.getUserInfor()
    }
    this.initial()
  },
  mounted() {
  },
  methods: {
    handError(rule) {
      return new Error(`${this.$t(`validation.user.${rule.field}`)} ${this.$t('validation.required')}`)
    },
    setData(response) {
    },
    getUser() {
      rf.getRequest('')
        .getEmployee({ id: this.userId })
        .then(res => {
          this.setData(res.data)
        })
    },
    initial() {
    },
    hasErrors() {
      return !_.isEmpty(this.errors)
    },
    submitForm(e) {
      e.preventDefault()
      this.isDisable = true
      this.$refs['postForm'].validate((valid) => {
        if (!valid) {
          this.isDisable = false
        }
      })
      if (!this.isDisable) return
      _.forEach(this.emp, (emp, i) => {
        this.formData.append(`${i}`, emp)
      })
      const params = this.user.concat(this.passwordDefault)
      if (this.empId) {
        return rf
          .getRequest('UserRequest')
          .update(params)
          .then(res => {
            this.handleRespone(res)
          })
      }
      rf.getRequest('UserRequest')
        .store(params)
        .then(res => {
          this.handleRespone(res)
        })
        .catch(() => (this.disabled = false))
    },
    handleRespone(response) {
      response.data.status
        ? window.location.reload()
        : this.errors.push({ keys: 'Lỗi chưa xác định trên server' })
    }
  }
}
</script>
<style scoped lang="sass">
.el-date-editor
  &.el-input
    width: 100%
.one-line
  display: block
  width: 100%
.container
  h5
    margin-bottom: 20px
  .input-group-addon
    padding: 8px 14px
    background-color: #eaedf0
    border-left: 1px solid #f3d9d9
    border-radius: 0 5px 5px 0
    font-size: 26px
.errors
  height: 40px;
  font-size: 20px;
  color: red;
button:disabled
  cursor: not-allowed;
</style>
