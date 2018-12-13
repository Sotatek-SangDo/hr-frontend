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
    showLoader() {
      // const preloader = $("#preloader");
      // if (preloader.length) {
      //   preloader.show();
      // } else {
      //   const ele = "<div id='preloader'><div class='loader'></div></div>";
      //   $("body").append(ele);
      // }
      // this.sleep(500).then(() => {
      //   preloader.fadeOut(4000, "linear", () => $(this).remove());
      // });
    }
  },
  mounted() {}
};
</script>
