<template>
  <div class="home" id="grid">
    <Options @updateChat="chat = $event" @updateMethod="method = $event" />
    <Instruction :method="method" />
    <Wordcloud :chat="chat" :method="method" />
  </div>
</template>

<script>
// @ is an alias to /src
import Options from '@/components/Options.vue'
import Wordcloud from '@/components/Wordcloud.vue'
import Instruction from '@/components/Instruction.vue'

export default {
  name: 'Home',
  components: {
    Options,
    Wordcloud,
    Instruction
  },

  data() {
    return {
      chat: [],
      method: 'all'
    }
  }
}
</script>


<style scoped>
#grid{
  display: grid;
  grid-row-gap: 1em;
  grid-template-columns:
  /* 1 */ 1fr;
  grid-template-rows:
  /* 1 */ auto
  /* 2 */ auto
  /* 3 */ 1fr
  /* 4 */ auto;
}
Options{
  grid-column: 1; grid-row: 1;
}

Instruction{
  grid-column: 1; grid-row: 2;
}

Wordcloud{
  grid-column: 1; grid-row: 3;
}

Footer{
  /*grid-column: 1; grid-row: 4;*/
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>
