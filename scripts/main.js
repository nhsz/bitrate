function main () {
  var urlBitfinex = 'https://api.bitfinex.com/v2/ticker/tBTCUSD';
  var lastRate = 0;
  var dailyChangePerc = 0;
  var chartValues = [lastRate, lastRate, lastRate, lastRate, lastRate, lastRate];
  var updateFrequencyInMs = 7000; // the exchange rate is updated every 7 seconds by default

  var currentRateReq = new XMLHttpRequest();
  currentRateReq.onload = getRate;
  currentRateReq.onerror = reqError;
  currentRateReq.open('get', urlBitfinex, true);
  currentRateReq.send();

  function getRate() {
    lastRate = JSON.parse(this.responseText)[6];
    dailyChangePerc = JSON.parse(this.responseText)[5];
    showRates(lastRate, lastRate, dailyChangePerc);
  }

  setInterval(function() {
    function reqListener() {  
      var data = JSON.parse(this.responseText);
      var rate = data[6];
      dailyChangePerc = data[5];

      showRates(rate, lastRate, dailyChangePerc);
      lastRate = rate;
      
      chartValues.push(rate);
      chartValues = chartValues.slice(Math.max(chartValues.length - 6));

      var lineChartData = {
        labels: ["", "", "", "", "", ""],
        datasets: [{
          fillColor: "rgba(100,220,220,0)",
          strokeColor: "#4995c4",
          pointColor: "#4995c4",
          data: chartValues
        }]
      }

      Chart.defaults.global.animationSteps = 50;
      Chart.defaults.global.tooltipYPadding = 16;
      Chart.defaults.global.tooltipCornerRadius = 0;
      Chart.defaults.global.tooltipTitleFontStyle = "normal";
      Chart.defaults.global.tooltipFillColor = "#1d313e";
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.scaleFontSize = 16;

      var ctx = document.getElementById("canvas").getContext("2d");
      var LineChartDemo = new Chart(ctx).Line(lineChartData, {
        pointDotRadius: 3,
        bezierCurve: false,
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        animation: false,
        responsive: true, 
        scaleOverride: true,
        scaleSteps: 15,
        scaleStartValue: 0,
        scaleStepWidth: 100,
        maintainAspectRatio: true
      });
    }

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('get', urlBitfinex, true);
    oReq.send();
  }, updateFrequencyInMs);

  function reqError(err) {  
  console.log('Fetch Error: ', err);  
}

  function showRates(rate, lastRate, dailyChangePerc) {
    var percentage = dailyChangePerc;
    var roundedRate = rate.toFixed(2);

    if (rate === lastRate) {
      rateFormatter('.bitfinex-rate', '#949494', roundedRate, percentage, '=');
    }
    else if (rate > lastRate) {
      rateFormatter('.bitfinex-rate', '#8bc040', roundedRate, percentage, '+');
    } else if (rate < lastRate) {
      rateFormatter('.bitfinex-rate', '#de5f66', roundedRate, percentage, '-');
    }
  }

  function rateFormatter(element, color, roundedRate, percentage, operator) {
    document.querySelector(element).style.color = color;
    document.querySelector(element).innerHTML = roundedRate + '(' + operator + percentage + '%)';
    document.querySelector(element).style.color = color;
  }
}