<!-- <template>
  <div/>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    init() {},
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    fadeOut(milliseconds) {
      const preloader = $('#preloader')
      if (preloader.is(':visible')) {
        this.sleep(milliseconds).then(() => {
          preloader.fadeOut(2000, 'linear', () => {
            $(this).remove()
          })
        })
      }
    },
    showModal() {
      $(`#${this.modal_id}`).modal('show')
    },
    hideModal() {
      $(`#${this.modal_id}`).modal('hide')
    },
    onHiddenModal(callback) {
      $(`#${this.modal_id}`).on('hidden.bs.modal', callback)
    },
    addEventShowModal(milliseconds = 1000) {
      this.sleep(milliseconds).then(() => {
        this.showModal()
        this.onHiddenModal(() => {
          this.clearData()
          this.isShow = false
        })
      })
    },
    hasErrorRequest(type) {
      return !_.isEmpty(this.errors[type])
    },
    emptyData(data) {
      return _.mapValues(data, () => '')
    },
    onErrorRequest() {
      window.EventBus.$on('errors', data => {
        this.errors[data.type] = data.error
        this.$forceUpdate()
      })
    },
    clearData(type) {
      delete this.errors[type]
    },
    setData(arg1, arg2) {
      return _.mapValues(arg1, (v, k) => {
        if (arg2.hasOwnProperty(k)) {
          return arg2[k]
        }
      })
    },
    emitEvent(eventName, eventData) {
      this.clearData()
      window.EventBus.$emit(eventName, eventData)
      this.hideModal()
    },
    showLoader() {}
  }
}
</script>

<style lang="sass">
button
  i.ti-save
    margin-right: 10px
</style>
 -->