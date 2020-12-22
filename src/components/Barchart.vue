<template>
  <div id="barchart">
    <canvas id="barchart_canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'Barchart',

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

    update_barchart: function () {
      var ctx = document.getElementById('barchart_canvas')
      var color = Chart.helpers.color
      window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
      }

      console.log('==========')
      console.log(ctx)
      console.log(this.chart)
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.chart),
          datasets: [
            {
              label: '# of Votes',
              data: Object.values(this.chart),
              backgroundColor: color(window.chartColors.blue)
                .alpha(0.5)
                .rgbString(),
              borderColor: window.chartColors.blue,
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio:false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      })
    },
  },

  created() {
    //this.update_barchart()
  },

  mounted() {
    
  },

  destroyed() {},

  computed: {
    chart: function () {
      var wordcloud = {}
      for (var i in this.chat) {
        var word = this.truncate(this.chat[i]['message'].trim(), 30)
          if (!(word in wordcloud)) {
            wordcloud[word] = 0
          }
          wordcloud[word] += 1
      }
      console.log(wordcloud)
      return wordcloud
    },
  },

  watch: {
    chart: function () {
      this.update_barchart()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#barchart {
  height: 100%;
  width: 100%;
}
</style>
