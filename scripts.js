(function main () {
  /* ----------------------------- CONFIG ----------------------------- */
  const apiUrl = 'https://api.bitfinex.com/v2/ticker/tBTCUSD'
  const updateFrequencyInMs = 30000 // exchange rate updated every 30s
  /* ------------------------------------------------------------------ */

  var rate = {
    current: 0
  }

  getRate()
  document.body.classList.add('spinner')
  var overlayAlreadyRemoved = false

  setInterval(function () {
    getRate()
  }, updateFrequencyInMs)

  function getRate () {
    fetch(apiUrl)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      rate.current = json[6]
      displayRate(rate.current)
    }).catch(function (error) {
      console.log(error)
    })
  }

  function displayRate (currentRate) {
    document.querySelector('.rate').innerHTML = currentRate.toFixed(2)
    removeOverlay()
    overlayAlreadyRemoved = true
  }

  function removeOverlay () {
    if (!overlayAlreadyRemoved) {
      document.querySelector('#overlay').remove()
      document.body.classList.remove('spinner')
    }
  }
  /*
  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function () {
        console.log('Service Worker Registered')
      })
  }
  */
})()
