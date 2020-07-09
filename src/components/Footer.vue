<template>
  <span id="footer">
    Chattarize <span id="version">{{ version }}</span> - chattarize.de -
    hello@soeren101.de
    <div id="messages"></div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </span>
</template>

<script>
export default {
  name: 'Footer',

  computed: {
    version: function () {
      return window.require('electron').remote.app.getVersion()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  grid-row: 4;
  text-align: center;
}
</style>
