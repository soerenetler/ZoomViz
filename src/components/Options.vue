<template>
  <div class="hello">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <table style="width:100%">
      <tr>
        <th>
          Choose Folder
          <span
            class="material-icons"
            title="The Zoom folder can normally be found in your Documents directory."
            >info</span
          >
        </th>
        <th>
          Choose Meeting
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
      </tr>
      <tr>
        <td>
          <div>{{ zoomFolder }}</div>
        </td>
        <td>
          <div class="warning" v-if="folderWithoutChatWarning">
            <strong>Warning!</strong> The folder does not contain a saved
            meeting chat!
          </div>
        </td>

        <td></td>
      </tr>

      <tr>
        <td>
          <button @click="selectFolder">Select Folder</button>
        </td>
        <td>
          <select v-model="meeting">
            <option disabled value="">Select meeting</option>
            <option
              v-for="meetingOption in meetingOptions"
              :key="meetingOption"
              >{{ meetingOption }}</option
            >
          </select>
        </td>

        <td>
          <select v-model="method">
            <option disabled value="">Select marker</option>
            <option value="all">All (Wordcloud)</option>
            <option value="#"># (Wordcloud)</option>
            <option value="!">! (Poll)</option>
            <option value="?">? (Question)</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const { dialog } = window.require('electron').remote
const fs = window.require('fs')
const path = require('path')

export default {
  name: 'Options',
  data() {
    return {
      method: '',
      meetingOptions: [],
      zoomFolder: '',
      meeting: '',
      polling: null,
      zoom_chat: '',
      folderWithoutChatWarning: false
    }
  },
  created() {
    this.pollData()

    // Auto select Zoom Folder
    if (
      process.env.USERPROFILE &&
      fs.existsSync(
        path.resolve(process.env.USERPROFILE, '/Documents/Zoom').toString()
      )
    ) {
      this.zoomFolder = path
        .resolve(process.env.USERPROFILE, '/Documents/Zoom')
        .toString()
    } else {
      console.log(
        'Auto Zoom Folder does not exist: ' +
          path.resolve(process.env.USERPROFILE, '/Documents/Zoom').toString()
      )
    }
  },

  mounted() {},

  beforeDestroy() {
    clearInterval(this.polling)
  },

  methods: {
    pollData: function() {
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
    }
  },

  watch: {
    meeting: function() {
      this.folderWithoutChatWarning = !fs.existsSync(
        path
          .resolve(this.zoomFolder, this.meeting, this.zoom_filename)
          .toString()
      )
    },

    proc_zoom_chat: {
      handler: function(newChat) {
        this.$emit('updateChat', newChat)
      },
      deep: true
    },
    method: {
      handler: function(newMethod) {
        this.$emit('updateMethod', newMethod)
      },
      deep: true
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
    }
  }
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

#sourrounding_div {
  grid-row: 3;
}
</style>
