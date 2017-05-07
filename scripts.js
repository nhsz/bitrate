(function main () {
  /* ----------------------------- CONFIG ----------------------------- */
  const url = 'https://api.bitfinex.com/v2/ticker/tBTCUSD'
  const updateFrequencyInMs = 30000 // exchange rate updated every 30s
  /* ------------------------------------------------------------------ */

  var lastRate = 0
  var currentRateReq = new XMLHttpRequest()

  document.body.classList.add('spinner')

  currentRateReq.onload = getRate
  currentRateReq.onerror = reqError
  currentRateReq.open('get', url, true)
  currentRateReq.send()

  function getRate () {
    lastRate = JSON.parse(this.responseText)[6]
    showRates(lastRate, lastRate)
    removeOverlay()
  }

  setInterval(function () {
    function reqListener () {
      var data = JSON.parse(this.responseText)
      var rate = data[6]
      showRates(rate, lastRate)
    }

    var oReq = new XMLHttpRequest()
    oReq.onload = reqListener
    oReq.onerror = reqError
    oReq.open('get', url, true)
    oReq.send()
  }, updateFrequencyInMs)

  function reqError (err) {
    console.log('Fetch Error: ', err)
  }

  function showRates (rate, lastRate) {
    var roundedRate = rate.toFixed(2)

    if (rate === lastRate) {
      formatRate('.rate', '#949494', roundedRate)
    } else if (rate > lastRate) {
      formatRate('.rate', '#8bc040', roundedRate)
    } else if (rate < lastRate) {
      formatRate('.rate', '#de5f66', roundedRate)
    }
  }

  function formatRate (element, color, roundedRate) {
    document.querySelector(element).style.color = color
    document.querySelector(element).innerHTML = roundedRate
  }

  function removeOverlay () {
    document.querySelector('#overlay').remove()
    document.body.classList.remove('spinner')
  }

  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function () {
        console.log('Service Worker Registered')
      })
  }
})()
