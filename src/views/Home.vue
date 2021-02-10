<template>
  <div class="home" id="grid">
    <link
      rel="stylesheet"
      href="https://unpkg.com/flickity@2/dist/flickity.min.css"
    />

    <Options @updateChat="chat = $event" @updateMethod="method = $event" />
    <Instruction :method="method" />
    <div class="carousel">
      <Wordcloud class="carousel-cell" :chat="chat" :method="method" />
      <Barchart class="carousel-cell" :chat="chat" :method="method" />
      <Flexbox class="carousel-cell" :chat="chat" :method="method" />
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="browserNotSupported"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="browserNotSupported">
        <h1>Your browser is not supported!</h1>
        <p>
          Currently we only support Google Chrome in the newest Version. But we
          are working hard to also support other browsers. If you write a kind
          e-mail we might even work a little faster ;)
          soeren@blauedaecher.com
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Options from '@/components/Options.vue'
import Wordcloud from '@/components/Wordcloud.vue'
import Flexbox from '@/components/Flexbox.vue'
import Barchart from '@/components/Barchart.vue'
import Instruction from '@/components/Instruction.vue'

import Flickity from 'flickity'

export default {
  name: 'Home',
  components: {
    Options,
    Wordcloud,
    Flexbox,
    Instruction,
    Barchart,
  },

  data() {
    return {
      chat: [],
      method: 'all',
      showModal: true,
    }
  },

  mounted() {
    new Flickity('.carousel', {
      cellSelector: '.carousel-cell',
      wrapAround: true,
      setGallerySize: false,
    })
  },
  computed: {
    browserNotSupported: function () {
      return window.showOpenFilePicker == null
    },
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

.carousel-cell {
  height: 100%;
  width: 100%;
  overflow: auto;
}

Footer {
  grid-column: 1;
  grid-row: 4;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;

  padding: 25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
