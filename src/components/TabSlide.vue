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
<style lang="sass">
.nav
  padding-left: 20px
  li.nav-item
    a.nav-link
      border: 1px solid #dee2e6
      &.active
        background-color: #38a83b
        color: #fff
      @media screen and (max-width: 415px)
        font-size: 12px;
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: 1px solid #dee2e6
</style>
