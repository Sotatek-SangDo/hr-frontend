<template>
  <div class = "mdl-tabs mdl-js-tabs">
     <div class="mdl-tabs__tab-bar">
        <a v-for="(tab, index) in tabs" :href="parseHref(index)" class="mdl-tabs__tab" v-text="tab" :class="!index ? 'is-active' : ''"/>
     </div>
     <slot name="tab-content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array
    },
  },
  methods: {
    parseHref(index) {
      const i = index + 1;
      return `#tab${i}-panel`;
    }
  }
};
</script>

