<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <table style="width:100%">
      <tr>
        <th>Choose Folder</th>
        <th>Choose Meeting</th>
        <th>Choose Method</th>
      </tr>
      <tr>
        <td>
          <button @click="selectFolder">Select Folder</button>
        </td>
        <td>
          <select v-model="meeting">
            <option disabled value="">Please select one</option>
            <option
              v-for="meetingOption in meetingOptions"
              :key="meetingOption"
              >{{ meetingOption }}</option
            >
          </select>
        </td>

        <td>
          <input type="radio" id="all" value="all" v-model="method" />
          <label for="all">All (Wordcloud)</label>
          <br />
          <input type="radio" id="#" value="#" v-model="method" />
          <label for="#"># (Wordcloud)</label>
          <br />
          <input type="radio" id="!" value="!" v-model="method" />
          <label for="!">! (Poll)</label>
          <br />
          <input type="radio" id="?" value="?" v-model="method" />
          <label for="?">? (Question)</label>
          <br />
        </td>
      </tr>
    </table>

    <div id="sourrounding_div" style="width:100%;height:500px">
      <div id="my_container"></div>
      <canvas style="display: none" id="my_canvas"></canvas>
    </div>
  </div>
</template>

<script>
import WordCloud from 'wordcloud'
const { dialog } = window.require('electron').remote
const fs = window.require('fs')

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      method: '',
      meetingOptions: [],
      zoomFolder: '',
      meeting: '',
      polling: null,
      zoom_chat: ''
    }
  },
  created() {
    this.pollData()
  },

  mounted() {},

  beforeDestroy() {
    clearInterval(this.polling)
  },

  methods: {
    pollData() {
      this.polling = setInterval(() => {
        console.log('RETRIEVE_DATA_FROM_BACKEND')
        if (this.ready) {
          this.zoom_chat = fs
            .readFileSync(
              this.zoomFolder + '/' + this.meeting + '/' + this.zoom_filename
            )
            .toString()
        }
      }, 3000)
    },

    selectFolder: function() {
      dialog
        .showOpenDialog({ properties: ['openDirectory'] })
        .then(result => {
          console.log(result.canceled)
          this.zoomFolder = result.filePaths[0]
          console.log(result.filePaths)
          this.meetingOptions = fs
            .readdirSync(this.zoomFolder, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
        })
        .catch(err => {
          console.log(err)
        })
    },
    truncate: function(str, n) {
      return str.length > n ? str.substr(0, n - 1) + '...' : str
    }
  },

  watch: {
    wordcloud: function() {
      console.log(this.wordcloud)
      console.log(WordCloud.isSupported)
      var width = 1000
      console.log(width)

      var div = document.getElementById('sourrounding_div')

      var canvas = document.getElementById('my_canvas')

      canvas.height = div.offsetHeight

      canvas.width = div.offsetWidth

      WordCloud(
        [
          this.$el.querySelector('#my_canvas'),
          this.$el.querySelector('#my_container')
        ],
        {
          list: this.wordcloud,
          gridSize: Math.round((16 * width) / 1024),
          weightFactor: function(size) {
            return (size * width * 20) / 1024
          },
          drawOutOfBound: true,
          shape: 'square',
          rotateRatio: 0.2
        }
      )
    }
  },

  computed: {
    ready: function() {
      return this.zoomFolder != '' && this.meeting != '' && this.method != ''
    },

    zoom_filename: function() {
      return 'meeting_saved_chat.txt'
    },

    proc_zoom_chat: function() {
      var split_zoom_chat = this.zoom_chat.split('\n')
      var proc_zoom_chat = []
      for (var i in split_zoom_chat) {
        var splitted_line = split_zoom_chat[i].split('	')
        if (splitted_line.length == 2) {
          var time = splitted_line[0]
          var user = splitted_line[1].split(' : ')[0]
          var message = splitted_line[1].split(' : ')[1]
          proc_zoom_chat.push({ time: time, user: user, message: message })
          console.log(time + ' --- ' + user + '---' + message)
        } else {
          console.log('line' + i + 'is skipped!')
        }
      }
      return proc_zoom_chat
    },
    wordcloud: function() {
      var wordcloud = {}
      for (var i in this.proc_zoom_chat) {
        var word = this.truncate(this.proc_zoom_chat[i]['message'].trim(), 30)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#my-container {
  width: inherit;
  height: inherit;
}
</style>
