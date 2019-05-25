const loader = document.querySelector("#loader");
let EurUsdRates = [];
let EurIlsRates = [];
let EurBtcRates = [];

const stopLoader = () => loader.remove();

const setLargeSize = () => {
  airChart.setSize(null, null);
  localStorage.removeItem("size");
};

const setSmallSize = () => {
  airChart.setSize(320, 280);
  localStorage.setItem(
    "size",
    JSON.stringify({
      width: airChart.chartWidth,
      height: airChart.chartHeight
    })
  );
};

const setChartSize = () => {
  const size = JSON.parse(localStorage.getItem("size"));
  size ? airChart.setSize(size.width, size.height) : null;
};

const chart = () =>
  Highcharts.chart("container", {
    chart: {
      zoomType: "x"
    },
    title: {
      text: "TradAir Exchange Rate"
    },
    subtitle: {
      text: "Source: TradAir"
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: '%Y-%m-%e',
    }
    },
    yAxis: {
      title: {
        text: "Exchange rate"
      }
    },
    legend: {
      verticalAlign: "bottom"
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    series: [
      {
        name: "EUR/USD",
        data: EurUsdRates
      },
      {
        name: "EUR/ILS",
        data: EurIlsRates
      },
      {
        name: "EUR/BTC",
        data: EurBtcRates
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: "100%"
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });

fetchData("api/rates/1")
  .then(data => {
    EurUsdRates = data;
    return;
  })
  .then(() => {
    fetchData("api/rates/2").then(data => {
      EurIlsRates = data;
      return;
    });
    return;
  })
  .then(() => {
    fetchData("api/rates/3").then(data => {
      EurBtcRates = data;
      airChart = chart();
      setChartSize();
      stopLoader();
    });
  });
