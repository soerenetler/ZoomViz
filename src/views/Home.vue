<template>
  <div class="home" id="grid">
    <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
    
    <Options @updateChat="chat = $event" @updateMethod="method = $event" />
    <Instruction :method="method" />
    <div class="carousel">
      <Wordcloud class="carousel-cell" :chat="chat" :method="method" />
      <Flexbox class="carousel-cell" :chat="chat" :method="method" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Options from '@/components/Options.vue'
import Wordcloud from '@/components/Wordcloud.vue'
import Flexbox from '@/components/Flexbox.vue'
import Instruction from '@/components/Instruction.vue'

import Flickity from 'flickity'

export default {
  name: 'Home',
  components: {
    Options,
    Wordcloud,
    Flexbox,
    Instruction,
  },

  data() {
    return {
      chat: [],
      method: 'all',
    }
  },

  mounted() {
    new Flickity('.carousel', {
      cellSelector: '.carousel-cell',
      wrapAround: true,
      setGallerySize: false
    })
  },
}
</script>

<style scoped>
#grid {
  display: grid;
  grid-row-gap: 1em;
  grid-template-columns:
  /* 1 */ 1fr;
  grid-template-rows:
  /* 1 */
    auto
    /* 2 */ auto
    /* 3 */ 1fr
    /* 4 */ auto;
}
Options {
  grid-column: 1;
  grid-row: 1;
}

Instruction {
  grid-column: 1;
  grid-row: 2;
}

.carousel {
  grid-column: 1;
  grid-row: 3;
}

.carousel-cell{
  height: 100%;
  width: 100%;
  overflow: auto;
}

Footer {
  /*grid-column: 1; grid-row: 4;*/
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
