<template>
  <div class="home">
    <Options @updateChat="chat = $event" @updateMethod="method = $event" />
    <Wordcloud :chat="chat" :method="method" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Options from '@/components/Options.vue'
import Footer from '@/components/Footer.vue'
import Wordcloud from '@/components/Wordcloud.vue'

export default {
  name: 'Home',
  components: {
    Options,
    Footer,
    Wordcloud
  },

  data() {
    return {
      chat: [],
      method: 'all'
    }
  }
}
</script>

<style scoped></style>
