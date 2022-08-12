"use strict";

const blue = document.querySelector("td.blue"),
  blueCollection = blue.querySelectorAll("td > input"),
  green = document.querySelector("td.green"),
  greenCollection = green.querySelectorAll("td>input"),
  yellow = document.querySelector("td.yellow"),
  yellowCollection = yellow.querySelectorAll("td > input"),
  red = document.querySelector("td.red"),
  redCollection = red.querySelectorAll("td > input"),
  btn = document.getElementById("store");

btn.addEventListener("click", async evt => {
  evt.preventDefault();
  // console.log(btn);
  const response = await fetch("/update_zones", {
    method: "PUT",
    body: JSON.stringify({
      blueZone: [.../* spread the feelings on to an Arr */ blueCollection]
        .filter(mood => mood.checked)
        .map(mood => mood.getAttribute("name")),
      greenZone: [...greenCollection]
        .filter(mood => mood.checked)
        .map(mood => mood.getAttribute("name")),
      yellowZone: [...yellowCollection]
        .filter(mood => mood.checked)
        .map(mood => mood.getAttribute("name")),
      redZone: [...redCollection]
        .filter(mood => mood.checked)
        .map(mood => mood.getAttribute("name")),
    }),
  });
  if (response.ok) {
    window.location = "moodChart.html";
  } else {
    console.log(response);
  }
});
