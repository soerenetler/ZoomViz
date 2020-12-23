<template>
  <span id="instruction">
    Please, write your answer
    <span v-if="showprefix()"> prefixed with a "{{ method }}" </span> in the
    chat.
    <br />
    Keep it short and simple! One response per message!
    <div id="messages"></div>
  </span>
</template>

<script>
export default {
  name: 'Instruction',

  props: {
    method: String,
  },
  methods: {
    showprefix: function () {
      return !(this.method == 'all')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#instruction {
  font-size: 20px;
  background-color: #f2cf1d;
  color: #18298c;
  padding: 5px;
}
</style>
