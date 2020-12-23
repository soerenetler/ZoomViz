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
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showImprint | showData" @click="showImprint=false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showImprint | showData">
        <h1>Your browser is not supported!</h1>
        <p>
          Curretly we only support Google Chrome in the newest Version. But we
          are working hard to also support other browsers. If you write a kind
          e-mail we might even work a little faster ;)
          chattarize@blauedaecher.com
        </p>
      </div>
    </transition>
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
