import "./node_modules/chart.js/dist/chart.min.js";
import "./node_modules/chart.js-plugin-labels-dv/dist/chartjs-plugin-labels.min.js";

(function moodChart() {
  "use strict";

  let clicked = true;

  const allCookies = document.cookie,
    parseCookie = str =>
      str
        .split(";")
        .map(v => v.split("="))
        .reduce((acc, v) => {
          acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
            v[1].trim()
          );
          return acc;
        }, {});

  const cookie = parseCookie(allCookies),
    account = JSON.parse(cookie.user),
    { redZone, blueZone, yellowZone, greenZone } = account,
    revertBtn = document.getElementById("revert"),
    logBtn = document.getElementById("Logga");

  logBtn.addEventListener("click", function log(evt) {
    evt.preventDefault();

    window.location = "moodTable.html";
  });

  const bluePair = Object.entries(blueZone).filter(
      ([key, value]) => value !== 0
    ),
    blueSum = bluePair.reduce((acc, val) => acc + val[1], 0 /* start */),
    greenPair = Object.entries(greenZone).filter(([key, val]) => val !== 0),
    greenSum = greenPair.reduce((acc, val) => acc + val[1], 0),
    yellowPair = Object.entries(yellowZone).filter(([key, val]) => val !== 0),
    yellowSum = yellowPair.reduce((acc, val) => acc + val[1], 0),
    redPair = Object.entries(redZone).filter(([key, val]) => val !== 0),
    redSum = redPair.reduce((acc, val) => acc + val[1], 0),
    blueArr = bluePair.map(([key, val]) => key),
    greenArr = greenPair.map(([key, val]) => key),
    yellowArr = yellowPair.map(([key, val]) => key),
    redArr = redPair.map(([key, val]) => key),
    blueNums = bluePair.map(([key, val]) => val),
    greenNums = greenPair.map(([key, val]) => val),
    yellowNums = yellowPair.map(([key, val]) => val),
    redNums = redPair.map(([key, val]) => val),
    defArr = [blueSum, greenSum, yellowSum, redSum],
    defLabel = ["Bluezone", "Greenzone", "Yellowzone", "Redzone"],
    defBackColor = ["#6699cc", "rgba(0, 168, 107, 1)", "#f9a602", "#800000"];

  function svMoods(arr) {
    const svMoodArr = [];

    if (arr === blueArr) {
      arr.forEach(mood => {
        switch (mood) {
          case "uttrakad":
            svMoodArr.push("uttrak??d");

            break;

          case "trog":
            svMoodArr.push("tr??g");

            break;

          case "hjalplos":
            svMoodArr.push("hj??lpl??s");

            break;

          case "kraftlos":
            svMoodArr.push("kraftl??s");
            break;

          case "nedstamd":
            svMoodArr.push("nedst??md");
            break;

          case "vardelos":
            svMoodArr.push("vardel??s");
            break;

          case "brustet_hjarta":
            svMoodArr.push("brustet hj??rta");
            break;

          case "snal":
            svMoodArr.push("sn??l");
            break;

          case "misstanksam":
            svMoodArr.push("misst??nksam");
            break;

          default:
            svMoodArr.push(mood);
            break;
        }
      });
    } else if (arr === greenArr) {
      arr.forEach(mood => {
        switch (mood) {
          case "eftertanksam":
            svMoodArr.push("eftert??nksam");

            break;

          case "sjalvsaker":
            svMoodArr.push("sj??lvs??ker");
            break;

          case "vagad":
            svMoodArr.push("v??gad");
            break;

          case "vordnadsfull":
            svMoodArr.push("v??rdnadsfull");
            break;

          case "karleksfull":
            svMoodArr.push("k??rleksfull");
            break;

          case "oppenhjartlig":
            svMoodArr.push("??ppenhj??rtlig");
            break;

          default:
            svMoodArr.push(mood);
            break;
        }
      });
    } else if (arr === yellowArr) {
      arr.forEach(mood => {
        switch (mood) {
          case "angslig":
            svMoodArr.push("??ngslig");

            break;

          case "forvanad":
            svMoodArr.push("f??rv??nad");
            break;

          case "besvarad":
            svMoodArr.push("besv??rad");
            break;

          case "hapen":
            svMoodArr.push("h??pen");
            break;

          case "nervos":
            svMoodArr.push("nerv??s");
            break;

          case "radd":
            svMoodArr.push("r??dd");
            break;

          case "angerfull":
            svMoodArr.push("??ngerfull");
            break;

          case "overvalmad":
            svMoodArr.push("??verv??lmad");
            break;

          case "missforstadd":
            svMoodArr.push("missf??rst??dd");
            break;

          case "forsiktig":
            svMoodArr.push("f??rsiktig");
            break;

          case "fortranger":
            svMoodArr.push("f??rtr??nger");
            break;

          case "osaker":
            svMoodArr.push("os??ker");
            break;

          case "otalig":
            svMoodArr.push("ot??lig");
            break;

          case "kanslig":
            svMoodArr.push("k??nslig");
            break;

          default:
            svMoodArr.push(mood);
            break;
        }
      });
    } else if (arr === redArr) {
      arr.forEach(mood => {
        switch (mood) {
          case "forskrackt":
            svMoodArr.push("f??rskr??ckt");

            break;

          case "upprord":
            svMoodArr.push("uppr??rd");
            break;

          case "kravande":
            svMoodArr.push("kr??vande");
            break;

          case "acklad":
            svMoodArr.push("??cklad");
            break;

          case "ovanlig":
            svMoodArr.push("ov??nlig");
            break;

          case "stangd":
            svMoodArr.push("st??ngd");
            break;

          case "fordomsfull":
            svMoodArr.push("f??rdomsfull");
            break;

          default:
            svMoodArr.push(mood);
            break;
        }
      });
    } else {
      console.log(arr);
    }
    return svMoodArr;
  }

  const svBlueArr = svMoods(blueArr),
    svGreenArr = svMoods(greenArr),
    svYellowArr = svMoods(yellowArr),
    svRedArr = svMoods(redArr);

  let selectedDatasetIdx /* clicked dataset idx */,
    selectedIdx; /* & it's data idx */

  const ctx = document.getElementById("doughnut").getContext("2d"),
    doughnut = new Chart(ctx, {
      type: "doughnut", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: defLabel,
        datasets: [
          {
            label: "Zones",
            data: defArr,
            backgroundColor: defBackColor,
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
            cutout: "80%",
          },
        ],
      },
      options: {
        layout: {
          padding: 20 /* px */,
        },
        tooltips: {
          enabled: true,
        },
        /* shorthand syntax */ onClick(
          click,
          elements /* selected segment */,
          chart
        ) {
          // console.log(elements[0].index)

          if (
            elements[0] /* datasetIdx is always 0 because there's only 1 chart */ &&
            clicked
          ) {
            selectedDatasetIdx = elements[0].datasetIndex;
            selectedIdx = elements[0].index;

            redrawDoughnut(selectedIdx);

            clicked = false;

            doughnut.update();
          }
        },
        maintainAspectRatio: false /* rectangle shape for more space */,
        plugins: {
          legend: {
            display: false /* remove legend labels */,
          },
          labels: {
            render: "label",
            fontColor: "#2b1700",
            position: "outside",
            textMargin: 6,
            fontFamily: "Trebuchet MS Bold",
            textShadow: true,
            fontStyle: "900",
            shadowBlur: 10,
            outsidePadding: 4,
          },
        },
      },
    });
  const {
    data: { datasets },
  } = doughnut;

  function redrawDoughnut(selectedIdx) {
    function lightenColor(num, r, g, b) {
      const colorShades = [],
        lightener = 1 / num.length;

      let shades = 1 + lightener;

      for (let index = 0; index < num.length; index++) {
        shades -= lightener;

        colorShades.push(`rgba(${r}, ${g}, ${b}, ${shades.toFixed(2)})`);
      }
      return colorShades;
    }

    const blueShades = lightenColor(blueArr, 102, 153, 204),
      greenShades = lightenColor(greenArr, 0, 168, 107),
      yellowShades = lightenColor(yellowArr, 249, 166, 2),
      redShades = lightenColor(redArr, 128, 0, 0);

    switch (selectedIdx) {
      case 0:
        datasets[0].data = blueNums;
        doughnut.data.labels = svBlueArr;
        datasets[0].backgroundColor = blueShades;
        datasets[0].borderWidth = 3;
        datasets[0].borderColor = "#222021";

        break;

      case 1:
        datasets[0].data = greenNums;
        doughnut.data.labels = svGreenArr;
        datasets[0].backgroundColor = greenShades;
        datasets[0].borderWidth = 3;
        datasets[0].borderColor = "#222021";

        break;

      case 2:
        datasets[0].data = yellowNums;
        doughnut.data.labels = svYellowArr;
        datasets[0].backgroundColor = yellowShades;
        datasets[0].borderWidth = 3;
        datasets[0].borderColor = "#222021";

        break;

      case 3:
        datasets[0].data = redNums;
        doughnut.data.labels = svRedArr;
        datasets[0].backgroundColor = redShades;
        datasets[0].borderWidth = 3;
        datasets[0].borderColor = "#222021";

        break;

      default:
        console.log(error);
        break;
    }

    revertBtn.classList.remove("hide");
  }

  revertBtn.addEventListener("click", function revert(evt) {
    evt.preventDefault();

    datasets[0].data = defArr;
    doughnut.data.labels = defLabel;
    datasets[0].backgroundColor = defBackColor;
    datasets[0].borderWidth = 1;
    clicked = true;

    doughnut.update();

    revertBtn.classList.add("hide");
  });
})();
