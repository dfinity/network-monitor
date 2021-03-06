const $ = require('jquery')
const Chart = require('chart.js');

const ctx = 'mainChart'

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Block Propagation',
      data: [],
    }]
  },
  options: {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Node'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero:true
        },
        scaleLabel: {
          display: true,
          labelString: 'Milliseconds'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false
  }
})

let query = '/api/block-propagation?type=numbers'

const params = new URLSearchParams(window.location.search)

const height = params.get('height')
const rank = params.get('rank')
const frequency = parseInt(params.get('frequency')) || 2
const freeze = params.get('freeze') == 'true'

if (height) query += "&height=" + height
if (rank) query += "&rank=" + rank

function update() {
  $.get(query, function(resp) {
    const labels = []
    const data = []
    for (let i = 0; i < resp.length; i++) {
      labels.push(i)
      data.push(resp[i])
    }
    chart.data.labels = labels
    chart.data.datasets[0].data = data
    chart.update()
  })
}

update()

if (!height && !freeze) {
  setInterval(update, frequency * 1000)
}