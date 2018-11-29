<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(tab, index) in tabs" class="nav-item" :key="index">
        <a class="nav-link" :href="parseHref(tab.href)" role="tab" data-toggle="tab" :class="!index ? 'active' : ''" v-text="tab.title"/>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array
    }
  },
  methods: {
    parseHref(id) {
      return `#${id}`;
    }
  }
};
</script>
