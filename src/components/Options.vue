<template>
  <div class="hello">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <table style="width: 100%">
      <tr>
        <th>
          Choose Zoom Chat
          <span
            class="material-icons"
            title="The Zoom folder can normally be found in your Documents directory."
            >info</span
          >
        </th>
        <th>
          Choose Method
          <span
            class="material-icons"
            title="The Zoom folder can normally be found in your Documents directory."
            >info</span
          >
        </th>
        <th>
          Settings
          <span
            class="material-icons"
            title="The Zoom folder can normally be found in your Documents directory."
            >info</span
          >
        </th>
      </tr>
      <tr>
        <td>
          <div class="warning" v-if="folderWithoutChatWarning">
            <strong>Warning!</strong> The selected file is not a meeting chat.
          </div>
        </td>
        <td></td>
        <td></td>
      </tr>

      <tr>
        <td>
          <button @click="selectFolder">Select Chat</button>
        </td>
        <td>
          <select v-model="method">
            <option value="all">All</option>
            <option value="#"># Hashtag</option>
            <option value="!">! Exclamation mark</option>
            <option value="?">? Question mark)</option>
          </select>
        </td>

        <td>
          <input type="checkbox" id="oneperperson" />
          <label for="oneperperson"> One entry per person</label>
          <br />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data() {
    return {
      chatfile: null,
      zoomFileHandle: null,
      method: 'all',
      meetingOptions: [],
      zoomFolder: '',
      meeting: '',
      polling: null,
      zoom_chat: '',
    }
  },
  created() {},

  mounted() {},

  beforeDestroy() {
    clearInterval(this.polling)
  },

  methods: {
    pollData: function () {
      this.polling = setInterval(async () => {
        console.log('RETRIEVE_DATA_FROM_BACKEND')
        this.chatfile = await this.zoomFileHandle.getFile()
        this.zoom_chat = await this.chatfile.text()
      }, 3000)
    },

    selectFolder: async function () {
      ;[this.zoomFileHandle] = await window.showOpenFilePicker()
      this.chatfile = await this.zoomFileHandle.getFile()
      this.zoom_chat = await this.chatfile.text()
      this.pollData()
    },
  },

  watch: {
    proc_zoom_chat: {
      handler: function (newChat) {
        this.$emit('updateChat', newChat)
      },
      deep: true,
    },
    method: {
      handler: function (newMethod) {
        this.$emit('updateMethod', newMethod)
      },
      deep: true,
    },
  },

  computed: {
    // if the selected file is not a zoom chat
    folderWithoutChatWarning: function () {
      return 0
    },

    ready: function () {
      return this.zoomFolder != '' && this.meeting != '' && this.method != ''
    },

    proc_zoom_chat: function () {
      var split_zoom_chat = this.zoom_chat.split('\n')
      var proc_zoom_chat = []
      for (var i in split_zoom_chat) {
        var splitted_line = split_zoom_chat[i].split('	')
        if (splitted_line.length == 2) {
          var time = splitted_line[0]
          var user = splitted_line[1].split(' : ')[0]
          var message = splitted_line[1].split(' : ')[1]
          proc_zoom_chat.push({
            time: time,
            user: user,
            message: message,
            line: i,
          })
          console.log(time + ' --- ' + user + '---' + message)
        } else {
          console.log('line' + i + 'is skipped!')
        }
      }
      return proc_zoom_chat
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#meetingSelect {
  width: 75%;
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

table {
  table-layout: fixed;
  grid-row: 2;
}

button {
  height: 40px;
  border-radius: 10px;
  background-color: white;
  color: #4caf50;
  border: 2px solid #4caf50; /* Green */

  transition-duration: 0.4s;
}

button:hover {
  background-color: #4caf50; /* Green */
  color: white;
  border: 2px solid white; /* Green */
}

select {
  border: 2px solid #4caf50; /* Green */
  color: #4caf50;
  background-color: white; /* Green */
  border-radius: 10px;
  height: 40px;
}
select:hover {
  border: 2px solid white; /* Green */
  color: white;
  background-color: #4caf50; /* Green */
  border-radius: 10px;
  height: 40px;
}

.warning {
  color: red;
  font-size: small;
}

.material-icons {
  font-size: small;
  vertical-align: super;
}
</style>
