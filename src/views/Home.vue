<template>
  <div class="home">
    <HelloWorld msg="Welcome to ZoomViz" />
    Current version: <span id="version">{{ version }}</span>
    <div id="messages"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  computed: {
    version: function() {
      return window.require('electron').remote.app.getVersion()
    }
  }
}
</script>
