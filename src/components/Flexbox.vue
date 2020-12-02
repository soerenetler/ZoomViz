<template>
  <ul id="flexbox">
    <li
      class="flex-item"
      v-for="line in chat"
      :key="line.i"
      :title="line.message"
    >
      {{ truncate(line.message, 200) }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Flexbox',

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
      console.log(this.wordcloud)
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
        if (word[0] == this.method || this.method == 'all') {
          if (!(word in wordcloud)) {
            wordcloud[word] = 0
          }
          wordcloud[word] += 1
        }
      }
      console.log(wordcloud)
      wordcloud = Object.entries(wordcloud)
      return wordcloud
    },
  },

  watch: {
    flexbox: function () {
      this.update_flexbox()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flexbox {
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}

.flex-item {
  border-color: tomato;
  border-style: solid;
  padding: 5px;
  width: 200px;
  height: 150px;
  margin-top: 10px;
  font-size: 1em;

  white-space: normal;
  word-break: break-word;
}
</style>
