<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default{
  name: 'App',
  mounted() {
    // this.$store.dispatch('getMasterData')
    console.log('mounted')
    console.log(this.$store.getters)
    if (getToken()) {
      this.$store.cache.dispatch('getMasterData')
    }
  }
}
</script>
