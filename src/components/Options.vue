<template>
  <div class="hello">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <table style="width: 100%">
      <tr>
        <th>
          Zoom Chat
          <span
            class="material-icons"
            title="The Zoom folder can normally be found in your Documents directory."
            >info</span
          >
        </th>
        <th>
          Marker
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
            <option value="?">? Question mark</option>
            <option value="/">/ Slash</option>
            <option value="+">+ Plus</option>
            <option value="§">§ Section sign</option>
          </select>
        </td>

        <td>
          <input type="checkbox" id="oneperperson" v-model="oneperperson" />
          <label for="oneperperson"> One entry per person</label>
          <br />
          <input type="checkbox" id="excludeprivate" v-model="excludeprivate" />
          <label for="excludeprivate"> Exclude private messages</label>
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
      oneperperson: false,
      excludeprivate: false,
      chatfile: null,
      zoomFileHandle: null,
      method: 'all',
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
      }, 1000)
    },

    selectFolder: async function () {
      ;[this.zoomFileHandle] = await window.showOpenFilePicker()
      this.pollData()
    },

    proc_zoom_chat: function (chat, method, oneperperson, excludeprivate) {
      var proc_zoom_chat = []
      var participants = new Set()

      var time = null
      var user = null
      var message = null

      const zoom_regex = /(\d\d:\d\d:\d\d)[\t]? ([^:]*) : (.*)/gm
      const bbb_regex = /\[(\d\d:\d\d)\] ([^:]*) : (.*)/gm
      const yulinc_regex = /(.*) {2}\((\d\d?.\d\d?.\d\d\d\d, \d\d:\d\d:\d\d)\):\r\n(.*?)\r\n-{48}/gm

      for (const m of chat.matchAll(zoom_regex)){
        if (m.length == 4) {
          time = m[1]
          user = m[2]
          message = m[3]
          if (message[0] == method || method == 'all') {
            if ((!oneperperson || (oneperperson && !participants.has(user))) && (!excludeprivate || (excludeprivate && !user.includes("(Privately)")))) {
              participants.add(user)
              proc_zoom_chat.push({
                time: time,
                user: user,
                message: message
              })
              console.log(
                'ZOOM NEW --- ' + time + ' --- ' + user + '---' + message
              )
            }
          }
        }
      }
      for (const m of chat.matchAll(bbb_regex)){
        console.log('BBB' + m)
        if (m.length == 4) {
          time = m[1]
          user = m[2]
          message = m[3]
          if (message[0] == method || method == 'all') {
            if (!oneperperson || (oneperperson && !participants.has(user))) {
              participants.add(user)
              proc_zoom_chat.push({
                time: time,
                user: user,
                message: message
              })
              console.log('BBB ---' + time + ' --- ' + user + '---' + message)
            }
          }
        }
      }
      for (const m of chat.matchAll(yulinc_regex)){
        console.log("Yulinc"+m)
        if (m.length == 4) {
          time = m[2]
          user = m[1]
          message = m[3]
          if (message[0] == method || method == 'all') {
            if (!oneperperson || (oneperperson && !participants.has(user))) {
              participants.add(user)
              proc_zoom_chat.push({
                time: time,
                user: user,
                message: message
              })
              console.log('yulink ---' + time + ' --- ' + user + '---' + message)
            }
          }
        }
      }

      return proc_zoom_chat
    }
  },

  watch: {
    method: {
      handler: function (method) {
        this.$emit(
          'updateChat',
          this.proc_zoom_chat(this.zoom_chat, method, this.oneperperson, this.excludeprivate)
        )
      },
      deep: true,
    },
    zoom_chat: {
      handler: function (zoom_chat) {
        this.$emit(
          'updateChat',
          this.proc_zoom_chat(zoom_chat, this.method, this.oneperperson, this.excludeprivate)
        )
      },
      deep: true,
    },
    oneperperson: {
      handler: function (oneperperson) {
        this.$emit(
          'updateChat',
          this.proc_zoom_chat(this.zoom_chat, this.method, oneperperson, this.excludeprivate)
        )
      },
      deep: true,
    },
     excludeprivate: {
      handler: function (excludeprivate) {
        this.$emit(
          'updateChat',
          this.proc_zoom_chat(this.zoom_chat, this.method, this.oneperperson, excludeprivate)
        )
      },
      deep: true,
    },
  },

  computed: {
    // if the selected file is not a zoom chat
    folderWithoutChatWarning: function () {
      return 0
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #18298c;
  border: 2px solid #18298c; /* Green */

  transition-duration: 0.4s;
}

button:hover {
  background-color: #18298c; /* Green */
  color: white;
  border: 2px solid white; /* Green */
}

select {
  border: 2px solid #18298c; /* Green */
  color: #18298c;
  background-color: white; /* Green */
  border-radius: 10px;
  height: 40px;
}
select:hover {
  border: 2px solid white; /* Green */
  color: white;
  background-color: #18298c; /* Green */
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
