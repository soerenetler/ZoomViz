<template>
  <span id="footer">
    Current version: <span id="version">{{ version }}</span>
    <div id="messages"></div>
  </span>
</template>

<script>
export default {
  name: 'Footer',

  computed: {
    version: function() {
      return window.require('electron').remote.app.getVersion()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  grid-row: 4;
  text-align: center;
}
</style>
