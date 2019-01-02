<template>
  <div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";

export default {
  data() {
    return {};
  },
  methods: {
    init() {
      document.querySelectorAll(".script").forEach(script => {
        const src = script.getAttribute("src");
        if (src.indexOf("code.highcharts") === -1) {
          const parent = script.parentElement;
          script.remove();
          const newTag = document.createElement("script");
          newTag.src = src;
          parent.append(newTag);
        }
      });
    },
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    fadeOut(milliseconds) {
      const preloader = $("#preloader");
      if (preloader.is(":visible")) {
        this.sleep(milliseconds).then(() => {
          preloader.fadeOut(2000, "linear", () => {
            $(this).remove();
          });
        });
      }
    },
    showModal() {
      $(`#${this.modal_id}`).modal("show");
    },
    hideModal() {
      $(`#${this.modal_id}`).modal("hide");
    },
    onHiddenModal(callback) {
      $(`#${this.modal_id}`).on("hidden.bs.modal", callback);
    },
    addEventShowModal(milliseconds = 1000) {
      this.sleep(milliseconds).then(() => {
        this.showModal();
        this.onHiddenModal(() => {
          this.clearData();
          this.isShow = false;
        });
      });
    },
    emptyData(data) {
      return _.mapValues(data, () => "");
    },
    setData(arg1, arg2) {
      return _.mapValues(arg1, (v, k) => {
        if (arg2.hasOwnProperty(k)) {
          return arg2[k];
        }
      });
    },
    emitEvent(eventName, eventData) {
      this.clearData();
      window.EventBus.$emit(eventName, eventData);
      this.hideModal();
    },
    showLoader() {}
  },
  mounted() {}
};
</script>

<style lang="sass">
button
  i.ti-save
    margin-right: 10px
</style>
