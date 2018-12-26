<template>
  <div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
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
    showModal(id) {
      $(`#${id}`).modal("show");
    },
    hideModal(id) {
      $(`#${id}`).modal("hide");
    },
    onHiddenModal(id, callback) {
      $(`#${id}`).on("hidden.bs.modal", callback);
    },
    showLoader() {}
  },
  mounted() {}
};
</script>
