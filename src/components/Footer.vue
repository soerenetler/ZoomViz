<template>
  <span id="footer">
    Chattarize - chattarize.de - hello@soeren101.de
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  grid-row: 4;
  text-align: center;
}
</style>
