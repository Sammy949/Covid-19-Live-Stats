"use strict";

const loaders = document.getElementsByClassName("spin_loader");
const markup = document.getElementsByClassName("data");
const button = document.getElementById("load_btn");

fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => {
    if (!response.ok) {
      throw Error("Error fetching results");
    }
    return response.json();
  })
  .then((res) => {
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].classList.add("d-none");
    }
    markup[0].innerHTML = `${res.cases.toLocaleString()}`;
    markup[1].innerHTML = `${res.active.toLocaleString()}`;
    markup[2].innerHTML = `${res.recovered.toLocaleString()}`;
    markup[3].innerHTML = `${res.critical.toLocaleString()}`;
    markup[4].innerHTML = `${res.tests.toLocaleString()}`;
    markup[5].innerHTML = `${res.deaths.toLocaleString()}`;
  })
  .catch((err) => {
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].classList.add("d-none");
      markup[i].innerHTML = `An error occured`;
    }

    console.log(err);
  });

const fetchResult = (country, countryName) => {
  button.innerHTML = `
  <span class="spinner-border spinner-border-sm"></span>
  `;
  for (let i = 0; i < loaders.length; i++) {
    markup[i].innerHTML = ``;
    loaders[i].classList.remove("d-none");
  }
  document.getElementById("title").innerHTML = `${countryName}`;

  fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching results");
      }

      return response.json();
    })
    .then((res) => {
      for (let i = 0; i < loaders.length; i++) {
        loaders[i].classList.add("d-none");
        button.disabled = false;
        button.innerHTML = "Search";
      }
      markup[0].innerHTML = `${res.cases.toLocaleString()}`;
      markup[1].innerHTML = `${res.active.toLocaleString()}`;
      markup[2].innerHTML = `${res.recovered.toLocaleString()}`;
      markup[3].innerHTML = `${res.critical.toLocaleString()}`;
      markup[4].innerHTML = `${res.tests.toLocaleString()}`;
      markup[5].innerHTML = `${res.deaths.toLocaleString()}`;
    })
    .catch((err) => {
      for (let i = 0; i < loaders.length; i++) {
        loaders[i].classList.add("d-none");
        markup[i].innerHTML = `An Error occured`;
      }
      button.disabled = false;
      button.innerHTML = "Search";
    });
};
