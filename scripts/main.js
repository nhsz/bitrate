function main () {
  var urlBitfinex = 'https://api.bitfinex.com/v2/ticker/tBTCUSD';
  var lastRate = 0;
  var chartValues = [];
  var updateFrequencyInMs = 7000; // the exchange rate is updated every 7 seconds by default

  var currentRateReq = new XMLHttpRequest();
  currentRateReq.onload = getRate;
  currentRateReq.onerror = reqError;
  currentRateReq.open('get', urlBitfinex, true);
  currentRateReq.send();

  function getRate() {
    lastRate = JSON.parse(this.responseText)[6];
    chartValues = [lastRate, lastRate, lastRate, lastRate, lastRate, lastRate];
    showRates(lastRate, lastRate);
  }

  setInterval(function() {
    function reqListener() {  
      var data = JSON.parse(this.responseText);
      var rate = data[6];

      showRates(rate, lastRate);
      
      if (rate !== lastRate) {
        chartValues.push(rate);
      }

      chartValues = chartValues.slice(Math.max(chartValues.length - 7));

      Chart.defaults.global.animationSteps = 50;
      Chart.defaults.global.tooltipYPadding = 16;
      Chart.defaults.global.tooltipCornerRadius = 0;
      Chart.defaults.global.tooltipTitleFontStyle = "normal";
      Chart.defaults.global.tooltipFillColor = "#1d313e";
      Chart.defaults.global.scaleFontSize = 16;
      Chart.defaults.global.legend.display = false;

      var CHART = document.getElementById('priceChart').getContext('2d');
      var priceChart = new Chart(CHART, {
        type: 'line',
        data: {
          labels: ["", "", "", "", "", "", ""],
          datasets: [
            {
              //label: "My First dataset",
              //fill: false,
              lineTension: 0.1,
              //fillColor: "rgba(25, 85, 120, 0.5)",
              //strokeColor: "#4995c4",
              //pointColor: "#4995c4",

              backgroundColor: "rgba(25, 85, 120, 0.4)",
              borderColor: "#4995c4",
              borderCapStyle: 'butt',
              //borderDash: [],
              //borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "#4995c4",
              pointBackgroundColor: "#4995c4",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              //pointHoverBackgroundColor: "rgba(75,192,192,1)",
              //pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointDotRadius: 3,
              pointHitRadius: 4,
              data: [65, 59, 80, 81, 56, 55, 40],
              //spanGaps: false,
            }
          ],
          /*
          options: {
              //pointDotRadius: 5,
              animation: false,
              responsive: true, 
              scaleOverride: true,
              //scaleSteps: 2000,
              scaleStartValue: 0,
              scaleStepWidth: 1,
              scaleShowLabels: false,
              maintainAspectRatio: false,
              scales: {
                scaleShowVerticalLines: false,
                scaleShowLabels: false,
                yAxes: [{
                  gridLines : {
                    color: "rgba(0, 0, 0, 0)",
                    display : false,
                  },
                  scaleLines : {
                    display : false,
                  }
                }],
                xAxes: [{
                  gridLines : {
                    color: "rgba(0, 0, 0, 0)",
                    display : false
                  },
                  scaleLines : {
                    display : false,
                  }
                }]
              }
            }*/
        },
        options: {
          animation: false,
          responsive: true,
          scales: {
            showScale: false,
            scaleShowVerticalLines: false,
            scaleShowLabels: false,
            xAxes: [{
              gridLines : {
                color: "rgba(0, 0, 0, 0)",
                display : false
              },
              scaleLines : {
                display : false
              },
              ticks: {
                display: false
              }
            }],
            yAxes: [{
              gridLines : {
                color: "rgba(0, 0, 0, 0)",
                display : false
              },
              scaleLines : {
                display : false
              },
              ticks: {
                display: false
              }
            }]
          }
        }
      });

      /*
          Chart.defaults.global.animationSteps = 50;
          Chart.defaults.global.tooltipYPadding = 16;
          Chart.defaults.global.tooltipCornerRadius = 0;
          Chart.defaults.global.tooltipTitleFontStyle = "normal";
          Chart.defaults.global.tooltipFillColor = "#1d313e";
          Chart.defaults.global.scaleFontSize = 16;
          Chart.defaults.global.legend.display = false;

          var ctx = document.getElementById('canvas').getContext('2d');
          
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ["", "", "", "", "", "", ""],
              datasets: [{
                data: chartValues,
                fillColor: "rgba(25, 85, 120, 0.5)",
                strokeColor: "#4995c4",
                pointColor: "#4995c4",
              }]
            },
            options: {
              pointDotRadius: 5,
              animation: false,
              responsive: true, 
              scaleOverride: true,
              scaleSteps: 2000,
              scaleStartValue: 0,
              scaleStepWidth: 1,
              scaleShowLabels: false,
              maintainAspectRatio: false,
              scales: {
                scaleShowVerticalLines: false,
                scaleShowLabels: false,
                yAxes: [{
                  gridLines : {
                    color: "rgba(0, 0, 0, 0)",
                    display : false,
                  },
                  scaleLines : {
                    display : false,
                  }
                }],
                xAxes: [{
                  gridLines : {
                    color: "rgba(0, 0, 0, 0)",
                    display : false
                  },
                  scaleLines : {
                    display : false,
                  }
                }]
              }
            }
          });
        */




      // OLD CHART

      /*
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
      Chart.defaults.global.showLines = false;

      var ctx = document.getElementById("canvas").getContext("2d");
      var LineChartDemo = new Chart(ctx).Line(lineChartData, {
        type: 'line',
        options: {
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                drawBorder: false
              }
            }],
            yAxes: [{
              display: false,
              gridLines: {
                drawBorder: false
              }
            }],
          }
        },
        pointDotRadius: 2.25,
        bezierCurve: false,
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        showLines: false,
        animation: false,
        responsive: true, 
        scaleOverride: true,
        scaleSteps: 5000,
        scaleStartValue: 0,
        scaleStepWidth: 0.25,
        scaleLineColor: 'transparent',
        maintainAspectRatio: true
      });
      */
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

  function showRates(rate, lastRate) {
    var roundedRate = rate.toFixed(2);

    if (rate === lastRate) {
      formatRate('.bitfinex-rate', '#949494', roundedRate);
    }
    else if (rate > lastRate) {
      formatRate('.bitfinex-rate', '#8bc040', roundedRate);
    } else if (rate < lastRate) {
      formatRate('.bitfinex-rate', '#de5f66', roundedRate);
    }
  }

  function formatRate(element, color, roundedRate) {
    document.querySelector(element).style.color = color;
    document.querySelector(element).innerHTML = roundedRate;
    document.querySelector(element).style.color = color;
  }
}