const submitText = document.getElementById("submitText");
const submitButton = document.getElementById("submitButton");
const infoName = document.getElementById("infoName");
const weatherIcon = document.getElementById("icon");
const infoTemp = document.getElementById("Temperature");
const infoWind = document.getElementById("Wind");
const infoHumid = document.getElementById("Humidity");
const infoUV = document.getElementById("UV");

var currentTime = moment();
const apiKey = "";

let cityHistory = [];
if (localStorage.getItem("cityHistory") != null) {
    cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
}

function saveHistory() {
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory)); 
}

function fillHistory(){
    searchHistory.innerHTML = "";
    console.log(cityHistory.length);
    for(i = 0; i < cityHistory.length; i++){
        var searchedCity = document.createElement("button");
        searchedCity.textContent = cityHistory[i];
        searchHistory.appendChild(searchedCity);
    }
}

function searchCity(){
    getCity(submitText.value);
}

function addToHistory(cityName){
    console.log(cityName + " " + cityHistory.length);
    let noMatch = true;
    for(i = 0; i < cityHistory.length; i++){
        console.log(cityHistory[i] + " " + cityName.value);
        if(cityHistory[i].toUpperCase() === cityName.toUpperCase()){
            noMatch = false;
        }
    }
    if(noMatch){
        console.log("noMatch");
        if(cityHistory.length >= 10){
            cityHistory.splice(0, 1);
        }
        console.log(cityHistory);
        cityHistory.push(cityName.toUpperCase());
        console.log(cityHistory);
        saveHistory();
        fillHistory();
    }
    submitText.textContent = "";
    submitText.TEXT_NODE = "";
}

function getCity(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(queryURL)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      addCity(data);
    })
    .catch(function() {
      // catch any errors
      return null;
    });
}

function addCity(city){
    infoName.textContent = city.name + " " + moment().format("L");
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png")
    infoTemp.textContent = "Temp: " + Math.floor((city.main.temp - 273.15) * 9/5 + 32) + "°F";
    infoWind.textContent = "Wind: " + city.wind.speed + "MPH";
    infoHumid.textContent = "Humidity: " + city.main.humidity + " %";
    let lat = city.coord.lat;
    let lon = city.coord.lon;
    let uvKey = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey;
    fetch(uvKey)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
        infoUV.textContent = "UV Index: " + data.current.uvi;
        if(data.current.uvi < 2){
          infoUV.setAttribute("class", "goodUV");
      } else if(data.current.uvi < 7){
          infoUV.setAtrribute("class", "moderateUV");
      } else {
          infoUV.setAttribute("class", "badUV");
      }
      fiveDayInfo.innerHTML = "";
      for(i =1; i < 6; i++){
          let weekDay = data.daily[i];
          let dayDate = document.createElement("div");
          dayDate.textContent = moment(new Date(data.daily[i].dt * 1000)).format("MM/DD/YYYY");

          let dayIcon = document.createElement("img");
          dayIcon.style.width = "40px";
          dayIcon.style.height = "40px";
          dayIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weekDay.weather[0].icon + ".png");
          let dayTemp = document.createElement("p");
          dayTemp.textContent = "Temp: " + weekDay.temp.day + "°F";
          let dayWind = document.createElement("p");
          dayWind.textContent  = "Wind: " + weekDay.wind_speed + " MPH";
          let dayHumid = document.createElement("p");
          dayHumid.textContent = "Humidity: " + weekDay.humidity + " %";

          let infoBox = document.createElement("div");
          fiveDayInfo.appendChild(infoBox);
          infoBox.appendChild(dayDate);
          infoBox.appendChild(dayIcon);
          infoBox.appendChild(dayTemp);
          infoBox.appendChild(dayWind);
          infoBox.appendChild(dayHumid);
      }
  })
}

function showFromHistory(event) {
  var element = event.target;
  if(element.nodeName === "BUTTON"){
      getCity(element.textContent);
  }
}

fillHistory();

getCity("Philadelphia");