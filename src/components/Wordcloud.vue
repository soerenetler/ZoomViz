<template>
  <div id="wordcloud">
    <div id="my_container"></div>
    <canvas style="display: none" id="my_canvas"></canvas>
  </div>
</template>

<script>
import WordCloud from 'wordcloud'

export default {
  name: 'Wordcloud',

  data() {
    return {}
  },

  props: {
    chat: Array,
    method: String,
  },

  methods: {
    truncate: function (str, n) {
      return str.length > n ? str.substr(0, n - 1) + '...' : str
    },

    update_wordcloud: function () {
      var width = 1000

      var div = document.getElementById('wordcloud')

      var canvas = document.getElementById('my_canvas')

      canvas.height = div.offsetHeight

      canvas.width = div.offsetWidth

      WordCloud(
        [
          this.$el.querySelector('#my_canvas'),
          this.$el.querySelector('#my_container'),
        ],
        {
          list: this.wordcloud,
          gridSize: Math.round((16 * width) / 1024),
          weightFactor: function (size) {
            return (size * width * 20) / 1024
          },
          drawOutOfBound: false,
          shape: 'square',
          rotateRatio: 0.2,
        }
      )
    },
  },

  created() {
    window.addEventListener('resize', this.update_wordcloud)
  },

  destroyed() {
    window.removeEventListener('resize', this.update_wordcloud)
  },

  computed: {
    wordcloud: function () {
      var wordcloud = {}
      for (var i in this.chat) {
        var word = this.truncate(this.chat[i]['message'].trim(), 30)
        if (!(word in wordcloud)) {
          wordcloud[word] = 0
        }
        wordcloud[word] += 1
      }
      console.log(wordcloud)
      wordcloud = Object.entries(wordcloud)
      return wordcloud
    },
  },

  watch: {
    wordcloud: function () {
      this.update_wordcloud()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#my_container {
  height: 100%;
  width: 100%;
}
</style>
