<template>
  <span id="footer">
    <table style="width: 100%;">
      <tr>
        <td>
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/dataprivacy">Data Privacy</router-link> |
            <router-link to="/imprint">Imprint</router-link>
          </div>
        </td>
        <td>
          <div id="info">Chattarize - chattarize.de - hello@soeren101.de</div>
        </td>
      </tr>
    </table>
  </span>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info {
  grid-row: 4;
  text-align: right;
}

#nav {
  grid-row: 4;
  text-align: left;
}
</style>
